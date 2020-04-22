<template>
  <Modal width="70%" v-model="showDialog" title="图片上传" @on-ok="ok" @on-cancel="cancel">
    <Tabs value="name1" type="card">
      <TabPane v-for="(tab,index) in tabs" :key="index" :label="tab" :name="`name${index+1}`">
        <div class="tab-body" v-if="tab === '本地上传'">
          <RadioGroup v-model="radioImage">
            <Card
              style="width: 20%;height: 180px;padding-top: 20px;box-sizing: border-box;"
              :dis-hover="true"
            >
              <div style="text-align: center;">
                <img
                  src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                  width="80%"
                  height="60%"
                />
                <Radio label="金斑蝶"></Radio>
              </div>
            </Card>
          </RadioGroup>
        </div>

        <div class="tab" v-else>
          <div class="tab-nav">
            <Button
              style="margin-right: 10px"
              size="default"
              :class="{'ivu-btn-primary': activedIndex === index, 'is-plain': activedIndex !== index}"
              @click="activedIndex = index"
              v-for="(item, index) in resourceGalleryList"
              :key="item"
            >{{item}}</Button>
          </div>
          <div class="tab-body" style="margin-top: 20px">
            <RadioGroup v-model="radioImage">
              <Card style="width: 20%;height: 180px;margin-right: 10px; padding-top: 20px;box-sizing: border-box;float: left" v-for="item in imageList" :key="item.id">
                <div style="text-align: center;">
                  <img
                    :src="item.url"
                    width="80%"
                    height="60%"
                  />
                  <Radio :label="item.fileName"></Radio>
                </div>
              </Card>
            </RadioGroup>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </Modal>
</template>

<script>
export default {
  props: {
    isShowUploadDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialog: false,
      deleteModal: false,
      name1: '',
      radioImage: '',
      tabs: ['本地上传', '资源图库'],
      resourceGalleryList: ['全部', '资讯', 'Banner', '投稿', '法律'],
      imageList: [
        {
          id: '1126431014496739329',
          fileName: 'home_banner_img',
          url: 'http://103.24.119.69:22180/group1/M00/00/0C/Zxh3RVzT_kCARcjCAAIQDqOsmvQ301.png',
          materialType: '0',
          dataFromType: '2'
        },
        {
          id: '1136431014496739330',
          fileName: 'news_icon_activity',
          url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          materialType: '0',
          dataFromType: '1'
        }
      ],
      activedIndex: 0
    }
  },
  watch: {
    isShowUploadDialog (newVal) {
      this.showDialog = newVal
    }
  },
  methods: {
    ok () {
      this.$emit('dialogOK')
    },
    cancel () {
      this.$emit('cancel')
      this.showDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
/* .ivu-radio-wrapper .ivu-radio-group-item .ivu-radio-default {
  position: relative;
  bottom: -50px;
} */

.tab-body {
  height: 600px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f6f7f9;
  .tab-nav {
    height: 60px;
    background-color: #fff;
  }
}

.is-plain {
  color: #3e8ef7;
  background: #ecf4fe;
  border-color: #b2d2fc;
}
</style>
