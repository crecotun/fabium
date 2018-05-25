import $ from 'jquery'
import 'vendor/isInViewport'

export default () => {
	const $component = $('.header')

	if (!$component.length) {
		return null
	}
}

