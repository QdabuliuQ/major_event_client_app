import React from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Button, Input, Form, NavBar } from 'react-vant';
import "./registerView.less"
import { registerUser } from "@/network/registerView/registerView";

export default function RegisterView() {
  const router = useNavigate()
  const [form] = Form.useForm()

  const onFinish = (data: {
    email: string
    phone: string
    password: string
  }) => {
    registerUser({
      email: data.email,
      phone: data.phone,
      password: data.password,
    }).then((res: any) => {
      if(res.status) {
        Toast.fail(res.msg)
      } else {
        Toast.success(res.msg)
        router(-1)
      }
    })
  }

  return (
    <div id='RegisterView'>
      <NavBar
        title="注册账号"
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />

      <div className='formContainer'>
        <img className='createImg' src={require('@/assets/images/createImg.png')} alt="" />
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
            labelWidth='4em'
            rules={[{ required: true, message: '请输入邮箱' },
            { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式错误' }]}
            name='email'
            label='邮箱'
          >
            <Input placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item
            labelWidth='4em'
            rules={[{ required: true, message: '请输入手机号' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式错误' }]}
            name='phone'
            label='手机号'
          >
            <Input placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            labelWidth='4em'
            rules={[{ required: true, message: '请输入密码' },
            { pattern: /^[\S]{6,12}$/, message: '密码长度在6-12之间' }]}
            name='password'
            label='密码'
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
