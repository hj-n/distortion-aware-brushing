/**
* implementation of core logics of distortion-aware brushing
*/

export function findInitialSeedPoint(ld, painterXPos, painterYPos, painterRadius, density) {
	// find the points within the painter
	let pointsInPainter = [];
	for (let i = 0; i < ld.length; i++) {
		let dist = Math.sqrt(
			Math.pow(ld[i][0] - painterXPos, 2) + Math.pow(ld[i][1] - painterYPos, 2)
		);
		if (dist < painterRadius) {
			pointsInPainter.push(i);
		}
	}

	// find the point with the highest density
	let maxDensity = 0;
	let maxDensityIndex = -1;
	for (let i = 0; i < pointsInPainter.length; i++) {
		if (density[pointsInPainter[i]] > maxDensity) {
			maxDensity = density[pointsInPainter[i]];
			maxDensityIndex = pointsInPainter[i];
		}
	}

	return maxDensityIndex;

}

export function findSeedPoints(ld, knn, painterXPos, painterYPos, painterRadius, density, initialSeedPointIdx) {
	const nnOfSeed = knn[initialSeedPointIdx];
	// find the nnOfSeed within the painter
	const nnOfSeedInPainter = nnOfSeed.filter(d => {
		let dist = Math.sqrt(
			Math.pow(ld[d][0] - painterXPos, 2) + Math.pow(ld[d][1] - painterYPos, 2)
		);
		return dist < painterRadius;
	});

	return nnOfSeedInPainter;
}

export function closeness(targetGroup, zeta, hdSim, knn) {
	/**
	returns a 1D array that contains closeness of each point to the target group
	*/
	return hdSim.map((simArr, i) => {
		const zetaNN = knn[i].slice(0, zeta);
		const zetaNNInTargetGroup = zetaNN.filter(d => targetGroup.includes(d));

		
		const simSumZetaNN = zetaNN.reduce((acc, cur) => acc + simArr[cur], 0);
		const simSumZetaNNInTargetGroup = zetaNNInTargetGroup.reduce((acc, cur) => acc + simArr[cur], 0);

		const closeness = simSumZetaNNInTargetGroup / simSumZetaNN;


		return closeness;
	});

}