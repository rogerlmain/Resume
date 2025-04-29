new MutationObserver ((mutations: MutationRecordList) => {
	mutations.forEach (() => {


	});
}).observe (document, { childList: true, subtree: true });
