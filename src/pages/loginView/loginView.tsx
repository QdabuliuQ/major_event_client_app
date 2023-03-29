import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, Form, Input, Button } from 'react-vant'
import { loginUser } from "@/network/loginView/loginView";
import v from "@/utils/globarVar";
import "./loginView.less"
import { getUserInfo } from '@/network/profileView/profileView';

export default function LoginView() {
  const router = useNavigate()

  const [code, setCode] = useState('<div></div>')
  const [svg, setSvg] = useState('<div class="codeError">网络错误</div>')
  const [form] = Form.useForm()

  const onFinish = (data: any) => {
    if (data.code == code) {
      loginUser({
        account: data.account,
        password: data.password
      }).then((res: any) => {
        if (res.status) {
          Toast.fail(res.msg)
        } else {
          Toast.success(res.msg)
          localStorage.setItem('token', res.token)
          localStorage.setItem('id', res.id)
          getUserInfo().then((res: any) => {
            localStorage.setItem('info', JSON.stringify(res.data))
          })
          router('/index', {
            replace: true
          })
        }
      })
    } else {
      Toast.fail('验证码错误')
    }
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
      setSvg(res.data.svg)
      setCode(res.data.code)
    }).catch(() => {
      Toast.fail('网络错误')
    })
  }

  useEffect(() => {
    getCode()
  }, [])

  return (
    <div id='LoginView'>
      <div className='formContainer'>
        <div className='topImage'>
          <img src={require('@/assets/images/loginImg.png')} alt="" />
        </div>
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
          <Form.Item
            rules={[{ required: true, message: '请填写验证码' }]}
            name='code'
            label='验证码'
          >
            <Input placeholder='输入验证码' suffix={<div className='codeContainer' onClick={getCode} dangerouslySetInnerHTML={{ __html: svg }}></div>} />
          </Form.Item>
        </Form>
      </div>
      <div className='linkContainer'>
        <span onClick={() => {
          router('/register')
        }}>注册账号</span>
        <span onClick={() => {
          router('/forget')
        }}>找回密码</span>
      </div>
      <div className='linkMask'></div>
    </div>
  )
}
