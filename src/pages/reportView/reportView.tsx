import { useState, useEffect } from 'react'
import { Toast, Uploader, Picker, Input, Form, Button, NavBar } from 'react-vant';
import { useNavigate, useParams } from "react-router-dom";
import { addArticleReport, getReportReason } from "@/network/reportView/reportView";
import { updateImage } from "@/network/editProfileView/editProfileView";
import "./reportView.less"

export default function ReportView() {
  const router = useNavigate()
  const { id } = useParams()

  const [proofList, setProofList] = useState<any>([])
  const [reason, setReason] = useState<string[]>([])
  const [desc, setDesc] = useState('')
  
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    let files = new FormData()
    for (let item of proofList) {
      files.append('proof', item)
    }
    // 上传图片
    updateImage('reportProof', files).then((res: any) => {
      let proofData = res.url
            
      addArticleReport({
        reason: values.reason,
        desc: values.desc,
        proof: proofList.length ? JSON.stringify(proofData) : '',
        art_id: id as string
      }).then((res: any) => {
        if(res.status) {
          return Toast.fail(res.msg)
        }
        Toast.success(res.msg)
        router(-1)
      })
    })
  }

  useEffect(() => {
    getReportReason().then((res: any) => {
      let list = []
      for(let item of res.data) {
        list.push(item.name)
      }
      setReason(list)
    })
  }, [])

  return (
    <div id='ReportView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title="举报内容"
        onClickLeft={() => router(-1)}
      />
      <div className='reportFormContainer'>
        <Form
          layout='vertical'
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
          <Form.Item rules={[{ required: true, message: '请选择举报理由' }]} isLink name='reason' label='举报理由' trigger='onConfirm'
            onClick={(_, action: any) => {
              action.current?.open()
            }}>
            <Picker
              popup
              columns={reason}
            >
              {val => val || '请选择'}
            </Picker>
          </Form.Item>
          <Form.Item rules={[{ required: true, message: '请输入举报描述' }]} name='desc' label='举报描述'>
            <Input.TextArea placeholder="请描述你遇到的问题" maxLength={200} showWordLimit />
          </Form.Item>
          <Form.Item
            label='证明材料'
          >
            <Uploader multiple
              maxCount={4}
              maxSize={500 * 1024}
              onChange={(v: any) => {
                console.log(v);
                let formData = []
                for (let item of v) {
                  formData.push(item.file)
                }
                setProofList(formData)
              }}
              onOversize={() => Toast.info('图片过大')} />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
