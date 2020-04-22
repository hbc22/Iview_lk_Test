<template>
  <div>
    <Modal
      width="90%"
      v-model="showDialog"
      :loading="loading"
      :title="dialogTitle"
      @on-ok="ok"
      @on-cancel="cancel"
      >
      <div class="content-write">
        <div class="content-left">
          <Form
            label-position="right"
            :model="dataForm"
            ref="myform"
            :label-width="80"
            :rules="ruleValidate"
          >
            <FormItem label="标题" prop="title">
              <Input v-model="dataForm.title" placeholder="标题" style="width: 450px" clearable />
            </FormItem>
            <FormItem label="模板类型" prop="template_type">
              <i-select
                :model.sync="dataForm.template_type"
                style="width:200px"
                placeholder="模板类型"
                clearable
              >
                <i-option
                  v-for="item in templateTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</i-option>
              </i-select>
            </FormItem>
            <FormItem label="发布平台" prop="publish_from">
              <i-select
                :model.sync="dataForm.publish_from"
                style="width:200px"
                placeholder="发布平台"
                clearable
              >
                <i-option
                  v-for="item in publishFromList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</i-option>
              </i-select>
            </FormItem>

            <FormItem label="资讯内容" prop="content">
              <div class="edit_container">
                <quill-editor
                  v-model="dataForm.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)"
                ></quill-editor>
              </div>

              <div v-html="str" class="ql-editor">{{str}}</div>
            </FormItem>
          </Form>
        </div>

        <div class="content-right">
          <div class="right-photo-title">基本属性</div>
          <div>
            <Tabs value="name1">
              <TabPane v-for="(tab,index) in tabs" :key="tab" :label="tab" :name="`name${index+1}`">
                <Form :model="dataForm2" label-position="right" :label-width="100">
                  <FormItem :label="tab === '视频' ? '上传视频封面' : '上传图片封面'">
                    <div class="uploadPhoto" @click="isShowCover">
                      <img
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        width="40%"
                        height="50%"
                        alt
                      />
                    </div>
                  </FormItem>
                  <FormItem :label-width="45">
                    <CheckboxGroup v-model="dataForm2.islikeList">
                      <Checkbox label="可点赞"></Checkbox>
                      <Checkbox label="可收藏"></Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="上传视频文件" prop="upload_video" v-if="tab === '视频'">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                      <Button type="primary" icon="ios-cloud-upload-outline">点击上传</Button>
                      <div>(仅支持.mp4/.webm/.ogg格式视频上传)</div>
                    </Upload>
                  </FormItem>
                  <FormItem label="资讯来源" prop="news_from">
                    <Input v-model="dataForm2.news_from" placeholder="资讯来源" width="60%" clearable />
                  </FormItem>
                  <FormItem label="发布人" prop="publish_user">
                    <Input
                      v-model="dataForm2.publish_user"
                      placeholder="发布人"
                      width="60%"
                      clearable
                    />
                  </FormItem>
                  <FormItem label="点赞数" prop="thumbup_num">
                    <InputNumber :max="999" :min="1" v-model="dataForm2.thumbup_num"></InputNumber>
                  </FormItem>
                  <FormItem label="浏览量" prop="browse_num">
                    <InputNumber :max="999" :min="1" v-model="dataForm2.browse_num"></InputNumber>
                  </FormItem>
                  <FormItem label="置顶" prop="is_on_top">
                    <InputNumber :max="999" :min="1" v-model="dataForm2.is_on_top"></InputNumber>
                  </FormItem>
                  <FormItem label="发布时间" prop="publish_time">
                    <DatePicker
                      v-model="dataForm2.publish_time"
                      type="datetime"
                      confirm
                      placeholder="选择日期"
                      style="width: 200px"
                    ></DatePicker>
                  </FormItem>
                </Form>
              </TabPane>
              <!-- <TabPane label="视频" name="name2">标签二的内容</TabPane> -->
            </Tabs>
          </div>
        </div>
      </div>
    </Modal>

    <!-- 上传文件弹窗 -->
    <news-photo-upload
      ref="newsPhotoUpload"
      :isShowUploadDialog="isShowUploadDialog"
      @dialogOK="uploadHandle"
      @cancel="isShowUploadDialog = false"
    ></news-photo-upload>
  </div>
</template>

<script>
import NewsPhotoUpload from '@/view/cms/news-photo-upload'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    NewsPhotoUpload,
    quillEditor
  },
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        template_type: [
          { required: true, message: '请选择模板类型', trigger: 'blur' }
        ],
        publish_from: [
          { required: true, message: '请选择发布平台', trigger: 'blur' }
        ]
      },
      showDialog: false,
      loading: true,
      isShowUploadDialog: false,
      tabs: ['图文', '视频'],
      name1: '',
      str: '',
      editorOption: {},
      templateTypeList: [
        {
          value: '0',
          label: '左图右文'
        },
        {
          value: '1',
          label: '无封面图'
        }
      ],
      publishFromList: [
        {
          value: '0',
          label: 'APP'
        },
        {
          value: '1',
          label: 'WEB'
        },
        {
          value: '2',
          label: '全平台'
        }
      ],
      dataForm: {
        content: '', // 富文本内容
        title: '',
        template_type: '',
        publish_from: ''
      },
      dataForm2: {
        islikeList: ['可点赞', '可收藏'],
        news_from: '',
        publish_user: '',
        thumbup_num: 0,
        browse_num: 0,
        is_on_top: 0
      }
    }
  },
  watch: {
    isShowModal (newVal) {
      this.showDialog = newVal
    }
  },
  computed: {
    dialogTitle () {
      return this.isEditMode ? '修改' : '新增'
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    let content = '' // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content)
  },
  methods: {
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    // 转码
    escapeStringHTML (str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    ok () {
      this.$emit('dialogOK', this.dataForm)
      this.dataForm = {}
    },
    cancel () {
      this.$emit('cancel')
      this.dataForm = {}
    },
    isShowCover () {
      this.isShowUploadDialog = true
    },
    uploadHandle () {}
  }
}
</script>

<style lang="less" scoped>
.content-write {
  width: 100%;
  overflow: hidden;
  /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    min-height: 480px;
  }
}
.content-left {
  width: 60%;
  float: left;
}
.content-right {
  float: left;
  width: 35%;
  height: auto;
  margin-left: 40px;
  border: 1px solid #f6f7f9;
}
.right-photo-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin-left: 10px;
}
.uploadPhoto {
  background: #f6f7f9;
  width: 60%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
