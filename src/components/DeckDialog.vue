<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">
			<!--
		  ...content
		  ... use q-card-section for it?
		-->
			<q-card-section>
				{{ props.deck.name }}
			</q-card-section>
			<q-card-section>
				<div class="row">
					<div class="col">
						Your cards
					</div>
					<div class="col">
						deck's cards
					</div>
				</div>
			</q-card-section>
			<!-- buttons example -->
			<q-card-actions align="right">
				<q-btn color="secondary" label="Save" @click="onOKClick" />
				<q-btn color="secondary" label="Cancel" @click="onDialogCancel" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
  
<script setup>
import { useDialogPluginComponent } from 'quasar'

const props = defineProps(['deck'])

defineEmits([
	// REQUIRED; need to specify some events that your
	// component will emit through useDialogPluginComponent()
	...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
	// on OK, it is REQUIRED to
	// call onDialogOK (with optional payload)
	onDialogOK()
	// or with payload: onDialogOK({ ... })
	// ...and it will also hide the dialog automatically
}
</script>