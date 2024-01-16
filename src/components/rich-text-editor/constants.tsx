import {
  RTEList,
  RTEInline,
  RTEBlock,
  RTELink,
  RTEImage,
} from './toolbar-buttons'

export const toolbarConfig = {
  options: ['inline', 'blockType', 'list', 'link', 'image'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: RTEInline,
    dropdownClassName: undefined,
    options: ['bold', 'italic'],
  },
  blockType: {
    inDropdown: false,
    options: ['H1', 'H6', 'Blockquote'],
    className: undefined,
    component: RTEBlock,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: RTEList,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: RTELink,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: false,
    defaultTargetOption: '_self',
    options: ['link'],
    linkCallback: undefined,
  },
  image: {
    className: undefined,
    component: RTEImage,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: false,
    alignmentEnabled: false,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
}
