<script>
export default {
  name: "Janken",
  data() {
    return {
      //なんでreturnを書く必要あるの？→子コンポーネントではdataは関数にしなければならないから
      //srcをv-bindした時は画像のパスをrequireしないとダメ
      src: require("../assets/choki.png"),
      imgList: [
        require("../assets/gu.png"),
        require("../assets/choki.png"),
        require("../assets/par.png")
      ],
      timer: null,
      resultMessage: ""
    };
  },
  methods: {
    changeImg(number) {
      // 画像の切替
      if (number && Math.abs(number) <= this.imgList.length) {
        this.src = this.imgList[number];
      } else {
        var num = Math.floor(Math.random() * this.imgList.length);
        this.src = this.imgList[num];
      }
    },
    gameStart() {
      //スタートボタンが押されたときの処理
      this.timer = setInterval(this.changeImg, 80);
      document.getElementById("gameStart").setAttribute("disabled", true);
      let btns = document.querySelectorAll(".button");
      for (let btn of btns) {
        btn.removeAttribute("disabled");
      }
    },
    onSelected(e) {
      clearInterval(this.timer);
      let btns = document.querySelectorAll(".button");
      for (let btn of btns) {
        btn.setAttribute("disabled", true);
      }
      document.getElementById("gameStart").removeAttribute("disabled");
      let button = e.target;
      //window.console.log(this.src)
      let resultNum = parseInt(this.imgList.indexOf(this.src), 10);
      let selectNum = parseInt(
        button.value,
        10
      ); /* 第一引数に渡した値を10進数に変換して返す */
      let kekkaNum = this.decisionJanken(selectNum, resultNum);
      console.log(kekkaNum);
      this.$store.commit("onSelected", kekkaNum);
      //window.console.log('勝ち負け(0 は負け, 1は勝ち,2は引き分け)→' + this.decisionJanken(selectNum, resultNum)),
    },
    decisionJanken(myHand, cpuHand) {
      let result = 0;
      switch (myHand) {
        case 0: //自分がぐー(0)のとき
          if (cpuHand === 0) {
            result = 2; // 引き分け
          } else if (cpuHand === 1) {
            result = 1; // 勝ち
          } else {
            result = 0; // 負け
          }
          break;
        case 1: // 自分がチョキ(1)
          if (cpuHand === 1) {
            result = 2; // 引分け
          } else if (cpuHand === 2) {
            result = 1;
          } else {
            result = 0;
          }
          break;
        case 2: // 自分がパー(2)の時
          if (cpuHand === 2) {
            result = 2;
          } else if (cpuHand === 0) {
            result = 1;
          } else {
            result = 0;
          }
      }
      return result;
    }
  },
  computed: {
    score() {
      return this.$store.getters.score;
    }
  }
};
</script>