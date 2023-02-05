import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Form, Input, Button } from 'react-vant'
import { loginUser } from "@/network/loginView/loginView";
import "./loginView.less"

interface IProps {

}

export default function LoginView(props: IProps) {
  const router = useNavigate()

  const [form] = Form.useForm()

  const onFinish = (data: any) => {
    loginUser({
      account: data.account,
      password: data.password
    }).then((res: any) => {
      if(res.status) {
        Toast.fail(res.msg)
      } else {
        Toast.success(res.msg)
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.id)
        router('/index', {
          replace: true
        })
      }
    })
  }

  return (
    <div id='LoginView'>
      <div className='formContainer'>
        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                提交
              </Button>
            </div>
          }
        >
          <Form.Item
            rules={[{ required: true, message: '请填写邮箱/手机号' }]}
            name='account'
            label='邮箱/手机号'
          >
            <Input placeholder='请输入邮箱/手机号' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写密码' }]}
            name='password'
            label='密码'
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
        </Form>
      </div>
      <div className='linkContainer'>
        <span onClick={() => {
          router('/register')
        }}>注册账号</span>
        <span>找回密码</span>
      </div>
    </div>
  )
}
