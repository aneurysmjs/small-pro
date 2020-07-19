export default function button({
  text = ''
}) {
  return {
    template() {
      return `<button>${text}</button>`
    }
  }
}