const makeItemDraggable = (itemEl) => itemEl.draggable = true;

const makeItemsDraggable = (rootEl) => Array.from(rootEl.children).forEach(makeItemDraggable);


export default function sortable(rootEl, onUpdate) {
  let dragEl, nextEl;

  // Делаем всех детей перетаскиваемыми
  makeItemsDraggable(rootEl);

  // Фнукция отвечающая за сортировку
  function _onDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";

    let target = evt.target;
    if (target && target !== dragEl && target.nodeName == "LI") {
      // Сортируем
      rootEl.insertBefore(
        dragEl,
        (rootEl.children[0] !== target && target.nextSibling) || target
      );
    }
  }

  // Окончание сортировки
  function _onDragEnd(evt) {
    evt.preventDefault();

    dragEl.classList.remove("ghost");
    rootEl.removeEventListener("dragover", _onDragOver, false);
    rootEl.removeEventListener("dragend", _onDragEnd, false);

    if (nextEl !== dragEl.nextSibling) {
      // Сообщаем об окончании сортировки
      onUpdate(dragEl);
    }
  }

  // Начало сортировки
  rootEl.addEventListener(
    "dragstart",
    function (evt) {
      console.log('evt', evt)
      dragEl = evt.target; // Запоминаем элемент который будет перемещать
      nextEl = dragEl.nextSibling;

      // Ограничиваем тип перетаскивания
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("Text", dragEl.textContent);

      // Пописываемся на события при dnd
      rootEl.addEventListener("dragover", _onDragOver, false);
      rootEl.addEventListener("dragend", _onDragEnd, false);

      setTimeout(function () {
        // Если выполнить данное действие без setTimeout, то
        // перетаскиваемый объект, будет иметь этот класс.
        dragEl.classList.add("ghost");
      }, 0);
    },
    false
  );
}
