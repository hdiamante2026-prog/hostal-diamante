'use client'

export const closeDialog = (dialogId:string) => {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement

  dialog.hidePopover()
} 


export const openDialog = (dialogId:string) => {
  const dialog = document.getElementById(dialogId) as HTMLDialogElement

  dialog.showPopover()
} 
