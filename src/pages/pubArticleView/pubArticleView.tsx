import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { NavBar, Selector, Input, Picker, Uploader, Toast, Button, Cell, ActionSheet } from 'react-vant';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { getArticleCate, addArticle } from "@/network/pubArticleView/pubArticleView";
import { updateImage } from "@/network/editProfileView/editProfileView";
import v from "@/utils/globarVar";
import "./pubArticleView.less"

export default function PubArticleView() {
  const router = useNavigate()
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  const [html, setHtml] = useState<string>('')
  const [height, setHeight] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [cateId, setCateId] = useState<string>('')  // 分类id
  const [targets, setTargets] = useState<any>(null)  // 选中标签
  const [cover, setCover] = useState<any>(null)  // 封面url
  const [title, setTitle] = useState('')  // 标题

  const [options, setOptions] = useState<{
    label: string
    value: string | number
  }[]>([])
  const [columns, setColumns] = useState<{
    text: string
    value: string
    targets: any[]
  }[]>([])


  const toolBarRef = useRef<HTMLDivElement>(null)

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys: [
      "headerSelect",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "through",
      "fontSize",
      "fontFamily",
      "lineHeight",
      "bulletedList",
      "numberedList",
      {
        iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
        key: "group-justify",
        menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
        title: "对齐"
      },
      "insertLink",
      "uploadImage",
      "uploadVideo",
      "codeBlock",
      "divider",
      "undo",
      "redo"
    ]
  }

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        fieldName: 'source',
        server: v.o_url + '/upload/articleSource',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        onSuccess: () => {
          Toast.success('上传图片成功')
        },

        onError: () => {
          Toast.fail('上传图片失败')
        }
      },
      uploadVideo: {
        fieldName: 'source',
        server: v.o_url + '/upload/articleSource',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        onSuccess: () => {
          Toast.success('上传视频成功')
        },
        onError: () => {
          Toast.fail('上传视频失败')
        }
      }
    }
  }

  // 发表文章
  const submitArticle = () => {
    if(html.trim() == '<p><br></p>') {
      Toast.fail('文章内容不能为空')
    } else if(title.trim() == '') {
      Toast.fail('文章标题不能为空')
    } else if(cateId == '') {
      Toast.fail('请选择文章分类')
    } else if(!cover) {
      Toast.fail('请上传文章封面')
    } else if(!targets) {
      Toast.fail('请选择文章标签')
    } else {
      // 上传图片
      let formData = new FormData()
      formData.append('cover', cover)
      updateImage('articleCover', formData).then((res: any) => {
        if(res.data.status) {  // 上传失败
          return Toast.fail(res.data.msg)
        }
        let coverUrl = res.data.url
        addArticle({
          title: title.trim(),
          content: html.trim(),
          cover_img: coverUrl,
          cate_id: cateId,
          targets: JSON.stringify(targets.items)
        }).then((res: any) => {
          if(res.status) {
            return Toast.fail(res.msg)
          }
          Toast.success(res.msg)
          setVisible(false)
          router(-1)
        })
      })
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    setTimeout(() => {
      setHeight(document.documentElement.clientHeight - 50 - (toolBarRef.current?.clientHeight as number))
    }, 0);

    getArticleCate().then((res: any) => {
      let data = []
      for (let item of res.data) {
        data.push({
          text: '',
          value: '',
          targets: []
        })
        data[data.length - 1].text = item.cate_name
        data[data.length - 1].value = item.cate_id
        let ts = []
        for (let t of item.targets) {
          ts.push({
            label: t.name,
            value: t.id,
          })
        }
        data[data.length - 1].targets = ts as any
      }
      setColumns(data)
    })

    setTimeout(() => {
      let menus = document.querySelectorAll('.w-e-bar-item') as any

      for (let i = 0; i < menus.length; i++) {
        if (i == 0 || i == 6 || i == 7 || i == 8 || i == 11) {
          menus[i].onclick = function () {
            let menuItem = menus[i]
            let list = menus[i].children[1]
            let info = menuItem.getBoundingClientRect()
            list.style.left = info.left + 'px'
            list.style.top = -(list.offsetHeight + 5) + 'px'
          }
        }
      }
    }, 500);



    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div id='PubArticleView'>
      <ActionSheet onCancel={() => setVisible(false)} closeOnPopstate={true} className='actionSheetClass' visible={visible}>
        <div className='articleContainer'>
          <div className='scrollContainer'>
            <div className='articleTitle'>
              <Input
                value={title}
                onChange={text => setTitle(text)}
                placeholder='请输入文章标题'
              />
            </div>
            <div className='articleCategory'>
              <div className='itemTitle'>文章分类</div>
              <Picker
                popup={{
                  round: true,
                }}
                title='文章分类'
                columns={columns}
                onConfirm={(val: any, d: any) => {
                  setCateId(val)
                  setOptions(d.targets)
                }}
              >
                {(val: any, _: any, actions) => {
                  return (
                    <Cell onClick={() => actions.open()} title={_ && _.text ? _.text : '请选择文章分类'} isLink />
                  )
                }}
              </Picker>
            </div>
            <div className='articleCover'>
              <div className='itemTitle'>文章封面</div>
              <Uploader
                multiple
                maxCount={1}
                maxSize={500 * 1024}
                onChange={(v: any) => {
                  console.log(v);
                  
                  setCover(v[0].file)
                }}
                onOversize={() => Toast.info('文件大小不能超过500kb')}
              />
            </div>
            <div className='articleTarget'>
              <div className='itemTitle'>文章标签</div>
              <Selector
                options={options}
                multiple={true}
                onChange={(arr, extend: any) => {
                  setTargets(extend)
                }}
              />
            </div>
          </div>
          <Button onClick={submitArticle} type='primary' block round>
            发布文章
          </Button>
        </div>
      </ActionSheet>
      <NavBar
        fixed={true}
        placeholder={true}
        title="发表文章"
        rightText="提交"
        onClickLeft={() => router(-1)}
        onClickRight={() => setVisible(true)}
      />

      <div style={{ height }} className='editorContainer'>
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '100%', overflowX: 'hidden', width: '100vw', overflowY: 'hidden' }}
        />
      </div>
      <div ref={toolBarRef} className='toolBarContainer'>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
        />
      </div>
    </div>
  )
}
