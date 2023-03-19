import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Input, NavBar, Toast } from 'react-vant'
import { useNavigate } from "react-router-dom";
import v from "@/utils/globarVar";
import { forgetPassword } from "@/network/forgetView/forgetView";
import "./forgetView.less"

export default function ForgetView() {
  const router = useNavigate()
  const [code, setCode] = useState('<div></div>')
  const [svg, setSvg] = useState('<div class="codeError">网络错误</div>')
  const [form] = Form.useForm()
  const onFinish = (data: any) => {
    if(data.code != code) return Toast.fail('验证码错误')
    if(data.password != data.re_password) return Toast.fail('密码不相同')
    // 提交请求
    forgetPassword({
      password: data.password,
      re_password: data.re_password,
      email: data.email,
      phone: data.phone,
    }).then((res: any) => {
      // 失败
      if(res.status) return Toast.fail('修改失败')
      // 成功
      Toast.success('修改成功')
      setTimeout(() => {
        router(-1)  // 页面回退
      }, 1000);
    })
  }

  const getCode = () => {
    const service = axios.create({
      baseURL: v.o_url + '/code/getCode', // api的base_url
      withCredentials: true, // 解决服务器设置token到cookies中，浏览器Application的cookies中没有存入token
      timeout: 20000 // 请求超时时间
    })
    service({
      url: v.o_url + '/code/getCode',
      method: 'get',
    }).then((res: any) => {
      console.log(res.data);
      
      setSvg(res.data.svg)
      setCode(res.data.code)
    }).catch(() => {
      Toast.fail('网络错误')
    })
  }

  useEffect(() => {
    getCode()  // 获取验证码
  }, [])

  return (
    <div id='ForgetView'>
      <NavBar
        title="忘记密码"
        onClickLeft={() => router(-1)}
      />
      <div className='formContainer'>
        <img className='forgetImg' src={require('@/assets/images/forgetImg.png')} alt="" />
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
            rules={[{ required: true, message: '请填写邮箱' },
            { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式错误' }]}
            name='email'
            label='邮箱'
          >
            <Input placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写手机号' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式错误' }]}
            name='phone'
            label='手机号'
          >
            <Input placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写验证码' }]}
            name='code'
            label='验证码'
          >
            <Input placeholder='输入验证码' suffix={<div className='codeContainer' onClick={getCode} dangerouslySetInnerHTML={{ __html: svg }}></div>} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写新密码' },
            { pattern: /^[\S]{6,12}$/, message: '密码长度在6-12之间' }]}
            name='password'
            label='新密码'
          >
            <Input type='password' placeholder='请输入新密码' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请确认密码' },
            { pattern: /^[\S]{6,12}$/, message: '密码长度在6-12之间' }]}
            name='re_password'
            label='确认密码'
          >
            <Input type='password' placeholder='请确认密码' />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
