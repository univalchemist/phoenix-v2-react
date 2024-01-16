import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  DragEvent,
  ChangeEvent,
  useMemo,
} from 'react'
import { Trans } from 'react-i18next'
import classNames from 'classnames'

import { Icon } from '@/components'
import { filterFiles, isHTMLNode, joinArray } from '@/utils'
import { t } from '@/i18n'
import { fileTypeMap } from '@/constants'
import { IDropAreaProps } from './types'

const DropArea = React.forwardRef<HTMLInputElement, IDropAreaProps>(
  ({ allowedTypes, allowedSize, file, error, onFilesLoaded }, ref) => {
    const dropAreaRef = useRef<HTMLDivElement>(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const [extensions, types] = useMemo(() => {
      const _extensions: string[] = []
      const _types: string[] = allowedTypes
      allowedTypes.forEach(t => {
        if (t in fileTypeMap) {
          _extensions.push(fileTypeMap[t])
        }
      })
      return [_extensions, _types]
    }, [allowedTypes])

    const onDragEnterHandler = useCallback(
      async (e: MouseEvent | DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const rect = dropAreaRef.current?.getBoundingClientRect()
        if ('dataTransfer' in e) {
          const [{ invalidFiles }] = await filterFiles(
            e.dataTransfer.files,
            allowedTypes,
            allowedSize,
          )
          if (invalidFiles.length) {
            return
          }
        }

        if (
          !isHTMLNode(dropAreaRef.current) ||
          (rect &&
            e.clientX > rect.left &&
            e.clientX < rect.right &&
            e.clientY > rect.top &&
            e.clientY < rect.bottom)
        ) {
          setIsDragOver(true)
        }
      },
      [allowedSize, allowedTypes],
    )

    const onDragMoveHandler = useCallback(
      (e: Event | DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
      },
      [],
    )

    const onDragLeaveHandler = useCallback(
      (e: MouseEvent | DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const rect = dropAreaRef.current?.getBoundingClientRect()

        if (
          !isHTMLNode(dropAreaRef.current) ||
          (rect &&
            (e.clientY < rect.top ||
              e.clientY >= rect.bottom ||
              e.clientX < rect.left ||
              e.clientX >= rect.right))
        ) {
          setIsDragOver(false)
        }
      },
      [],
    )

    const onDropHandler = useCallback(
      (e: Event | DragEvent<HTMLDivElement>) => {
        setIsDragOver(false)
        e.preventDefault()
        e.stopPropagation()
        if ('dataTransfer' in e) {
          onFilesLoaded(e.dataTransfer.files?.[0] || null)
        }
      },
      [onFilesLoaded],
    )

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onFilesLoaded(e.target.files?.[0] || null)
        e.target.value = ''
      },
      [onFilesLoaded],
    )

    useEffect(() => {
      const { current } = dropAreaRef
      if (current && isHTMLNode(current)) {
        current.addEventListener('drop', onDropHandler)
        current.addEventListener('dragenter', onDragEnterHandler)
        current.addEventListener('dragleave', onDragLeaveHandler)
        current.addEventListener('dragover', onDragMoveHandler)
      }

      return () => {
        if (current && isHTMLNode(current)) {
          current.removeEventListener('drop', onDropHandler)
          current.removeEventListener('dragenter', onDragEnterHandler)
          current.removeEventListener('dragleave', onDragLeaveHandler)
          current.removeEventListener('dragover', onDragMoveHandler)
        }
      }
    }, [
      onDropHandler,
      onDragEnterHandler,
      onDragLeaveHandler,
      onDragMoveHandler,
    ])

    return (
      <div
        className={classNames('upload-box', {
          'dragging-over': isDragOver,
          error,
        })}
        ref={dropAreaRef}
      >
        <label>
          <input
            ref={ref}
            type="file"
            multiple
            accept={types.join(',')}
            onChange={onChangeHandler}
          />
        </label>
        {file ? (
          <img src={file} className="file-loaded" alt="File picked" />
        ) : (
          <Icon name="document-upload" />
        )}

        <h4>
          <Trans
            i18nKey="clickToUpload"
            components={{
              tag: <b />,
            }}
          />
        </h4>
        <p>
          {t('supportedFiles', {
            format1: joinArray(
              ', ',
              ...extensions.slice(0, extensions.length - 1),
            ),
            format2: extensions[extensions.length - 1],
            width: allowedSize.width ?? 800,
            height: allowedSize.height ?? 400,
          })}
        </p>
      </div>
    )
  },
)

export default DropArea
