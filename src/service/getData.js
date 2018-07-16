import Request from '../utils/require';
async function getCrowdDetailData(id) {
    try {
        let detailData = await Request({
            url: 'QueryCrowdDataById',
            data: {id},
            type: 'get',
        });
        let qrCode = await Request({
            url: 'GetQrCode',
            data: {
                contents: detailData.data.contractId,
                width: 130,
                height: 130,
            },
            type: 'get',
        });
        let systemTime = await Request({ url: 'GetSystemTime', type: 'get' });
        return Object.assign({}, detailData.data, { qrCode: qrCode.data, systemTime: systemTime.data });
    } catch (error) {
        console.error('getCrowdDetailData error_>', error);
    }
}

export default getCrowdDetailData;