import $ from 'jquery'

export default () => {
	const $component = $('.header')

	if (!$component.length) {
		return null
	}

	Promise.all(['1']).then(() => {
		alert(1212)
	})
}

