<template>
  <div class="memberInfo-pane">
    <ul class="Total">
      <li><i><b></b></i><strong>29<em></em></strong><span title="现有职工">本单位会员<br>
          (名)</span></li>
      <li><i><b></b></i><strong>6<em></em></strong><span title="工会会员">本单位绑定用户<br>
          (名)</span></li>
      <li><i><b></b></i><strong>480<em></em></strong><span title="全市区县工会">会员总数<br>
          (名)</span></li>
      <li><i><b></b></i><strong>70<em></em></strong><span title="乡镇、街道工会">移动端绑定用户<br>
          (名)</span></li>
      <li><i><b></b></i><strong>20<em></em></strong><span title="其中农民工会员">少数民族会员<br>
          (名)</span></li>
    </ul>
    <!-- <Row :gutter="15">
      <i-col :span="12">
        <Card>
          <div slot="header" class="clearfix">
            <span class="ETitle">近一年各月会员统计</span>
          </div>
          <div class="grid-content bg-purple EDiv"
               id="testEchart1"></div>
        </Card>
      </i-col>
    </Row> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      label: {
        normal: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#eee',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#999',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 14,
              lineHeight: 30
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="less">
.memberInfo-pane {
  width: 100%;
  padding: 15px;
  .Total {
    height: 160px;
    padding: 1px 0;
    padding: 20px;
    background-color: #f7f7f7;
    li {
      width: 20%;
      height: 120px;
      text-align: center;
      float: left;
      cursor: pointer;
      position: relative;
      border: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-family: 'Microsoft YaHei';
      outline: 0;
      i {
        -webkit-animation: Close .5s ease-in-out both;
        animation: Close .5s ease-in-out both;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 120px;
        b {
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid #E56C59;
          position: absolute;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          font-weight: bolder
        }
      }
       strong {
         display: block;
         font-size: 36px;
         color: #e56c59;
         font-weight: 400;
         height: 60px;
         line-height: 90px;
         margin-bottom: 5px;
       }
       span {
         color: #434343;
         font-size: 14px;
       }
    }
  }
}
</style>
