function getAllElementNextSiblings(ele) {
	var next = ele;
	var result = [];
	while(next = next.nextSibling) {
		if(next.nodeType === Node.ELEMENT_NODE) {
			result.push(next);
		}
	}
	return result;
}
function getClosestOneNextSibling(ele) {
	var next = ele;
	while(next = next.nextSibling) {
		next = next.nextSibling;
		if(next.nodeType === Node.ELEMENT_NODE) {
			return next;
		}

	}
	return null;
}
function getClosestOnePreviousSibling(ele) {
	var prev = ele;
	while(prev = prev.previousSibling) {
		prev = prev.previousSibling;
		if(prev.nodeType === Node.ELEMENT_NODE) {
			return prev;
		}

	}
	return null;
}
function getAllElementPreviousSiblings(ele) {
	var prev = ele;
	var result = [];
	while(prev = prev.previousSibling) {
		if(prev.nodeType === Node.ELEMENT_NODE) {
			result.push(prev);
		}
	}
	return result;
}