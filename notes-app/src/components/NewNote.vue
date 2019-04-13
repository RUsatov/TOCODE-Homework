<template>
  <!-- new note -->
  <div class="new-note">
    <label>Title</label>
    <input v-model="note.title" type="text">

    <h4>Выберите приоритет</h4>
    <div class="radio-block">
      <div class="radio">
        <input id="radio-1" value="normal" type="radio" v-model="note.priority">
        <label for="radio-1" class="radio-label">Обычный</label>
      </div>

      <div class="radio">
        <input id="radio-2" value="high" type="radio" v-model="note.priority">
        <label  for="radio-2" class="radio-label">Важный</label>
      </div>

      <div class="radio">
        <input id="radio-3" value="veryHigh" type="radio" v-model="note.priority">
        <label  for="radio-3" class="radio-label">Очень важный</label>
      </div>
    </div>

    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addNote () {
      this.$emit('addNote', this.note)
    },
    
  }
}
</script>

<style lang="scss" scoped>
.new-note {
	text-align: center;
}
h4{
  margin-bottom: 20px;
  text-align: left;
}
.radio-block {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

$color1: #f4f4f4;
$color2: #494ce8;

.radio {
	margin: 0.5rem;
	input[type='radio'] {
		position: absolute;
		width: 20px;
		cursor: pointer;

		opacity: 0;
		 + .radio-label {
			 cursor: pointer;
			&:before {
				content: '';
				position: relative;
				top: -0.2em;

				display: inline-block;
				width: 1.4em;
				height: 1.4em;
				margin-right: 1em;

				vertical-align: top;
				text-align: center;

				background: $color1;
				border: 1px solid darken($color1, 25%);
				border-radius: 100%;
				cursor: pointer;

				transition: all 250ms ease;
			}
		}
		&:checked {
			 + .radio-label {
				&:before {
					background-color: $color2;
					box-shadow: inset 0 0 0 4px $color1;
				}
			}
		}
		&:focus {
			 + .radio-label {
				&:before {
					border-color: $color2;
					outline: none;
				}
			}
		}
		&:disabled {
			 + .radio-label {
				&:before {
					background: darken($color1, 25%);
					border-color: darken($color1, 25%);
					box-shadow: inset 0 0 0 4px $color1;
				}
			}
		}
		 + .radio-label {
			 cursor: pointer;
			&:empty {
				&:before {
					margin-right: 0;
				}
			}
		}
	}
}
</style>

