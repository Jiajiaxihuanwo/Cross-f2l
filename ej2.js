// 1. 找到按钮
const boton = document.querySelector("button");
// 2. 当按钮被点击时
boton.onclick = function () {
  // 3. 回到按钮的父盒子 <div>
  const caja = boton.parentElement;
  // 4. 在这个盒子里找到纸条 <p>
  const texto = caja.querySelector("p").textContent;
  // 5. 创建一张新的纸条 <p>
  const nuevoP = document.createElement("p");
  nuevoP.textContent = texto;
  // 6. 把新纸条贴到页面最下面
  document.body.appendChild(nuevoP);
};