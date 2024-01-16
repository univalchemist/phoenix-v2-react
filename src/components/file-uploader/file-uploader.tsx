import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { filterFiles } from '@/utils'
import { t } from '@/i18n'
import { FormError } from '../form-error'
import DropArea from './drop-area'
import { IFileUploaderProps, IFileUploadControl } from './types'
import './file-uploader.scss'

export const FileUploader = React.forwardRef<
  IFileUploadControl,
  IFileUploaderProps
>(
  (
    {
      allowedTypes,
      allowedSize = { width: 800, height: 400 },
      label,
      required,
      onLoad,
    },
    ref,
  ) => {
    const dropAreaRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<string | null>(null)
    const [error, setError] = useState<string>('')

    const onFilesLoaded = useCallback(
      async (_file: File | null) => {
        const [{ invalidFiles, validFiles }, _error] = await filterFiles(
          _file ? [_file] : [],
          allowedTypes,
          allowedSize,
        )

        setError('')
        if (invalidFiles.length) {
          if (_error === 'invalid-size') {
            setError(t('unsupportedSize'))
          } else {
            setError(t('unsupportedFormat'))
          }
        }

        setFile(validFiles[0] ? URL.createObjectURL(validFiles[0]) : null)
        onLoad(validFiles[0] || null)
      },
      [allowedSize, allowedTypes, onLoad],
    )

    useImperativeHandle(ref, () => ({
      remove: () => {
        setFile(null)
        setError('')
        if (dropAreaRef.current) {
          dropAreaRef.current.value = ''
        }
      },
    }))

    return (
      <div className="file-uploader-container">
        {!!label && (
          <span className="form-label name">
            {label}
            {!!required && <sup>*</sup>}
          </span>
        )}
        <DropArea
          ref={dropAreaRef}
          error={!!error}
          allowedSize={allowedSize}
          file={file}
          allowedTypes={allowedTypes}
          onFilesLoaded={onFilesLoaded}
        />
        <FormError error={error} />
      </div>
    )
  },
)

export default FileUploader
