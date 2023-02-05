import { useEffect, useState, useRef } from 'react'
import { NavBar, Cascader, Input, Form, Button, Picker, DatetimePicker, Toast } from 'react-vant';
import { useNavigate } from "react-router-dom";
import { fileType } from "@/utils/tools";
import city from "@/utils/city"
import { getUserInfo, updateImage, udateUserInfo } from "@/network/editProfileView/editProfileView";
import "./editProfileView.less"

export default function EditProfileView() {
  const router = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [info, setInfo] = useState<any>(null)
  const [type, setType] = useState<string>('')
  const [form] = Form.useForm()

  const onFinish = (data: any) => {
    let province: any = null, city: any = null, area: any = null
    if(data.location && data.location.length) {
      [province, city, area] = data.location
    }
    let u_info = {
      user_pic: info.user_pic,
      nickname: data.nickname,
      sex: data.sex == '男' ? 1 : (data.sex == '女' ? 2 : null),
      intro: data.intro,
      birthday: data.birthday ? new Date(data.birthday).getTime() as unknown as bigint : null,
      province,
      city,
      area,
      bg_image: info.bg_image
    }
    
    udateUserInfo(u_info).then((res: any) => {
      if(res.status) {
        Toast.fail(res.msg)
      } else {
        Toast.success(res.msg)
      }
    })
  }

  // 时间转换
  const convertTime = (val: Date) => {
    let year = val.getFullYear()
    let month = (val.getMonth() + 1).toString().padStart(2, '0')
    let day = (val.getDate()).toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 上传图片
  const fileUpload = () => {
    let file = (inputRef.current?.files as any)[0]
    if(fileType(file.name) == 'image') {
      let formData = new FormData()
      formData.append(type == 'user_pic' ? "avatar" : "bg_image", file)
      updateImage(type == 'user_pic' ? 'avatar' : 'userBgimage', formData).then((res: any) => {
        if (res.status) {
          Toast.fail(res.msg)
        } else {
          Toast.success(res.msg)
          let u_info = { ...info }
          u_info[type] = res.url
          setInfo(u_info)
        }
      })
    } else {
      Toast.fail('请上传图片')
    }
  }

  useEffect(() => {
    getUserInfo().then((res: any) => {
      console.log(res);
      setInfo(res.data)
      if (res.data.province) {
        form.setFieldsValue({ location: [res.data.province, res.data.city, res.data.area] })
      }
    })
  }, [])

  return (
    <div id='EditProfileView'>
      <NavBar
        title="编辑资料"
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      {
        info && (
          <div className='formContainer'>
            <div className='avatarContainer'>
              <div className='avatar'>
                <img onClick={() => {
                  setType('user_pic')
                  inputRef.current?.click()
                }} src={info.user_pic} alt="" />
                <input onChange={fileUpload} type="file" ref={inputRef} />
              </div>
              <span>点击更换图片</span>
            </div>
            <Form
              form={form}
              onFinish={onFinish}
              controlAlign='right'
              footer={
                <div style={{ margin: '16px 16px 0' }}>
                  <Button round nativeType='submit' type='primary' block>
                    修改信息
                  </Button>
                </div>
              }
            >
              <Form.Item
                rules={[{ required: true, message: '请填写用户名' }]}
                name='nickname'
                initialValue={info.nickname}
                label='用户名'
              >
                <Input placeholder='请输入用户名' />
              </Form.Item>
              <Form.Item
                name='intro'
                initialValue={info.intro ? info.intro : undefined}
                label='简介'
              >
                <Input placeholder='请输入简介' />
              </Form.Item>
              <Form.Item
                name='bg_image'
                label='背景图'
                isLink
                onClick={() => {
                  setType('bg_image')
                  inputRef.current?.click()
                }}
              >
                去更换
              </Form.Item>
              <Form.Item
                name='sex'
                label='性别'
                isLink
                trigger='onConfirm'
                onClick={(_, action: any) => {
                  action.current?.open()
                }}
              >
                <Picker
                  popup
                  defaultValue={info.sex == 1 ? '男' : (info.sex == 2 ? '女' : '')}
                  columns={[
                    '男',
                    '女',
                  ]}
                >
                  {val => val || '选择性别'}
                </Picker>
              </Form.Item>
              <Form.Item
                name='birthday'
                label='生日'
                isLink
                trigger='onConfirm'
                onClick={(_, action: any) => {
                  action.current?.open()
                }}
              >
                <DatetimePicker minDate={new Date(1950, 0, 1)}
                  maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())} popup type='date'>
                  {(val: Date) => (val ? convertTime(val): (info.birthday ? convertTime(new Date(info.birthday)) : '请选择日期') )}
                </DatetimePicker>
              </Form.Item>
              <Form.Item
                isLink
                name='location'
                label='所在地'
                onClick={(_, action: any) => {
                  action.current?.open()
                }}
              >
                <Cascader
                  popup={{ round: true }}
                  title='请选择地区'
                  options={city}
                >
                  {(_, selectedRows, actions) => (
                    <span>{selectedRows.length ? selectedRows.map(el => el.text).join(',') : '请选择地区'}</span>
                  )}
                </Cascader>
              </Form.Item>
            </Form>
          </div>
        )
      }

    </div>
  )
}
