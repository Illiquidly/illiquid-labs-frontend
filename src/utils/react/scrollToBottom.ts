export default function scrollToBottom() {
	window.scrollTo({
		top: document.documentElement.scrollHeight,
		behavior: 'auto',
	})
}
