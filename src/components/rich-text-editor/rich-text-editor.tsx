import React, { useCallback, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { FormError } from '../form-error'
import { toolbarConfig } from './constants'
import { IRichTextEditorProps } from './types'
import './rich-text-editor.scss'

const htmlToEditorState = (html?: string) => {
  if (html === undefined) return
  const contentBlock = htmlToDraft(html)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    )
    return EditorState.createWithContent(contentState)
  }
}

export const RichTextEditor: React.FC<IRichTextEditorProps> = ({
  label,
  placeholder,
  error,
  className,
  disabled,
  required,
  initialValue,
  minHeight = 200,
  maxHeight,
  onChange,
}) => {
  const editorRef = useRef(null)
  const [focused, setFocused] = useState<boolean>(false)
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  )

  useEffect(() => {
    if (editorState.getCurrentContent().hasText()) return
    const state = htmlToEditorState(initialValue)
    if (state) {
      setEditorState(state)
    }
  }, [editorState, initialValue])

  useEffect(() => {
    if (!placeholder) {
      setIsPlaceholder(false)
    } else if (initialValue) {
      setIsPlaceholder(false)
    } else {
      setIsPlaceholder(true)
    }
  }, [initialValue, placeholder])

  const onEditorStateChange = useCallback(
    (state: EditorState) => {
      setEditorState(state)
      const html = draftToHtml(convertToRaw(state.getCurrentContent()))
      setIsPlaceholder(html.trim() === '<p></p>')
      onChange?.(html)
    },
    [onChange],
  )

  return (
    <label
      className={classNames('custom-rich-text-editor', className, {
        error: !!error,
        disabled: !!disabled,
      })}
    >
      {!!label && (
        <span className="form-label name">
          {label}
          {!!required && <sup>*</sup>}
        </span>
      )}
      <span
        className={classNames('form-field', {
          focused,
        })}
      >
        <Editor
          ref={editorRef}
          placeholder={placeholder}
          readOnly={disabled}
          editorState={editorState}
          toolbarClassName="rte-toolbar"
          wrapperClassName="rte-wrapper"
          wrapperStyle={{ minHeight, maxHeight }}
          editorClassName={classNames('rte-editor custom-scrollbar', {
            placeholder: isPlaceholder,
          })}
          onEditorStateChange={onEditorStateChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          toolbar={toolbarConfig}
        />
      </span>

      <FormError error={error} />
    </label>
  )
}

export default React.memo(RichTextEditor)
