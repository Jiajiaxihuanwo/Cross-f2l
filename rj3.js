// 1. 找到所有按钮
const botones = document.querySelectorAll("button");

// 2. 给每个按钮加事件监听
botones.forEach(boton => {
  boton.addEventListener("click", function () {
    // 3. 找到按钮的父元素 <div>
    const caja = this.parentElement;

    // 4. 在这个 div 里找到 p 的文字
    const texto = caja.querySelector("p").textContent;

    // 5. 创建新的 p 元素
    const nuevoP = document.createElement("p");
    nuevoP.textContent = texto;

    // 6. 把新 p 加到 body 最下面
    document.body.appendChild(nuevoP);
  });
});