import React, { useRef, useState } from 'react'

import { Button, Container, FileUploader, Text } from '@/components'
import { t } from '@/i18n'

type TFileUploader = React.ElementRef<typeof FileUploader>

const AppearanceFiles: React.FC = () => {
  const colorLogoRef = useRef<TFileUploader>(null)
  const whiteLogoRef = useRef<TFileUploader>(null)
  const favicoRef = useRef<TFileUploader>(null)

  const [colorLogo, setColorLogo] = useState<File | null>(null)
  const [whiteLogo, setWhiteLogo] = useState<File | null>(null)
  const [favico, setFavico] = useState<File | null>(null)

  return (
    <Container col gap={16} className="w-100">
      <Container col gap={12} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.logoTypeColor')}
        </Text>
        <FileUploader
          ref={colorLogoRef}
          label={t('userSettings.thisLogoIsUsedInHeader')}
          allowedTypes={['image/png', 'image/gif', 'image/jpeg']}
          allowedSize={{ width: 800, height: 400 }}
          onLoad={_file => {
            setColorLogo(_file)
          }}
        />
        <Container align="center" gap={16}>
          <Button
            disabled={!colorLogo}
            variant="secondary"
            size="md"
            className="file-action-btn"
          >
            {t('userSettings.upload')}
          </Button>
          <Button
            disabled={!colorLogo}
            variant="outline"
            size="md"
            className="file-action-btn"
            onClick={ev => {
              ev.stopPropagation()
              ev.preventDefault()
              setColorLogo(null)
              colorLogoRef.current?.remove()
            }}
          >
            {t('userSettings.deleteCurrent')}
          </Button>
        </Container>
      </Container>
      <Container col gap={12} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.logoTypeWhite')}
        </Text>
        <FileUploader
          ref={whiteLogoRef}
          label={t('userSettings.thisLogoIsUsedInHeader')}
          allowedTypes={['image/png', 'image/gif', 'image/jpeg']}
          allowedSize={{ width: 800, height: 400 }}
          onLoad={_file => {
            setWhiteLogo(_file)
          }}
        />
        <Container align="center" gap={16}>
          <Button
            disabled={!whiteLogo}
            variant="secondary"
            size="md"
            className="file-action-btn"
          >
            {t('userSettings.upload')}
          </Button>
          <Button
            disabled={!whiteLogo}
            variant="outline"
            size="md"
            className="file-action-btn"
            onClick={ev => {
              ev.stopPropagation()
              ev.preventDefault()
              setWhiteLogo(null)
              whiteLogoRef.current?.remove()
            }}
          >
            {t('userSettings.deleteCurrent')}
          </Button>
        </Container>
      </Container>
      <Container col gap={12} className="w-100">
        <Text
          font="medium"
          size={12}
          fontWeight={500}
          lineHeight={16}
          color="--primary-light"
        >
          {t('userSettings.favicon')}
        </Text>
        <FileUploader
          ref={favicoRef}
          allowedTypes={['image/png', 'image/gif', 'image/jpeg']}
          allowedSize={{ width: 800, height: 400 }}
          onLoad={_file => {
            setFavico(_file)
          }}
        />
        <Container align="center" gap={16}>
          <Button
            disabled={!favico}
            variant="secondary"
            size="md"
            className="file-action-btn"
          >
            {t('userSettings.upload')}
          </Button>
          <Button
            disabled={!favico}
            variant="outline"
            size="md"
            className="file-action-btn"
            onClick={ev => {
              ev.stopPropagation()
              ev.preventDefault()
              setFavico(null)
              favicoRef.current?.remove()
            }}
          >
            {t('userSettings.deleteCurrent')}
          </Button>
        </Container>
      </Container>
    </Container>
  )
}

export default AppearanceFiles
