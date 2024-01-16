import React, { useCallback, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import classNames from 'classnames'
import * as yup from 'yup'

import Logo from '@/assets/images/logo.svg'
import { Button, Form, TextInput } from '@/components'
import { useAuth, useHookForm } from '@/hooks'
import { t } from '@/i18n'
import { loginFormSchema } from '@/utils'

interface Props {}

export const SignInPage: React.FC<Props> = () => {
  const { onSignIn } = useAuth()
  const {
    handler: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useHookForm(loginFormSchema)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [keepSignin, toggleKeepSignin] = useState(false)

  const onSubmit: SubmitHandler<yup.InferType<typeof loginFormSchema>> =
    useCallback(
      data => {
        onSignIn({ ...data, keepSignin })
      },
      [onSignIn, keepSignin],
    )

  return (
    <div
      className={classNames('login-page', {
        loading: false,
      })}
    >
      <div className="login-form">
        <Form className="content-box" onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <Button>
              <Logo />
            </Button>
          </div>

          <div className="form-data">
            <div className="form-fields">
              <TextInput
                label={t('email')}
                className="w-100"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
              />
              <TextInput
                label={t('password')}
                className="w-100"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
          </div>
          <div className="form-submit">
            <Button type="submit" className="main-btn">
              {t('signIn')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignInPage
