const dbPromised = idb.open("epl", 1, function(upgradeDb) {
	const matchesObjectStore1 = upgradeDb.createObjectStore("matches", {keyPath: "id"});
	matchesObjectStore1.createIndex("id_matches", "id_matches", {unique: false});
});

function saveForLater(matchDetail) {
	dbPromised
		.then(function(db) {
			const tx = db.transaction("matches", "readwrite");
			const store = tx.objectStore("matches");
			console.log(matchDetail);
			store.add(matchDetail.match);
			return tx.complete;
		})
		.then(function() {
			console.log("match berhasil di simpan.");
		});
}

function getAll() {
	return new Promise(function(resolve, reject) {
		dbPromised
			.then(function(db) {
				const tx = db.transaction("matches", "readonly");
				const store = tx.objectStore("matches");
				return store.getAll();
			})
			.then(function(matches) {
				resolve(matches);
			});
	});
}

function getDetail(id) {
	return new Promise(function(resolve, reject) {
		dbPromised
			.then(function(db) {
				const tx = db.transaction("matches", "readonly");
				const store = tx.objectStore("matches");
				return store.get(id);
			})
			.then(function(match) {
				resolve(match);
			});
	});
}

function deleteMatchDetail(id) {
	dbPromised
		.then(function(db) {
			const tx = db.transaction("matches", "readwrite");
			const store = tx.objectStore("matches");
			store.delete(id);
			return tx.complete;
		})
		.then(function() {
			console.log("Item deleted");
		});	
}

export {getAll, getDetail, saveForLater, deleteMatchDetail};
