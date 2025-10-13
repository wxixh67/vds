/**
 * es6 | babel
 */
class CheckFbLive {
    constructor(content = '') {
        this.live_count = 0
        this.die_count = 0
        this.content = content || ''
    }

    get objIds () {
        return this.content.split('\n')
            .map(item => item.trim())
            .filter(item => item.length)
    }

    /**
     * @param {string|number} uid
     * @returns {Promise<boolean>} false when die, true when live
     */
    checkLive(uid) {
        return axios
            .get(`https://graph.facebook.com/${uid}/picture?type=normal`)
            .then(response => {
                return !response.request.responseURL.includes('static');
            })
            .catch(() => false)
    }

    checkLiveWithThreads(threads = 50, callbackCheckLive = null, onDone = null) {
        const array = this.objIds;

        // Lay ra so luong uid moi luong se check live
        const chunkSize = Math.ceil(array.length / threads);
        // Chuan bi du lieu cho moi luong check live
        const dataPerThreads = [];

        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            dataPerThreads.push(chunk);
        }

        const total = dataPerThreads.length;
        let done = 0;

        for (let listIds of dataPerThreads) {
            this.checkLives(listIds, callbackCheckLive).then(() => {
                done++;
                if (done >= total) {
                    if (typeof onDone == "function") onDone();
                }
            });
        }
    }

    async checkLives(arrayIds, callback = null) {
        for (let uid of arrayIds) {
            let realUid = uid.toString().trim();

            if (!realUid.match(/^\d+$/)) {
                let match = uid.match(/(\d+)/);
                if (!match) continue;

                realUid = match[1];
            }

            let live = await this.checkLive(realUid);

            this[live ? 'live_count' : 'die_count']++;

            if (typeof callback === "function") callback(uid, live);
        }
    }
}

$(document).ready(function () {
    delete axios.defaults.headers.common['X-CSRF-TOKEN'];

    $.fn.extend({
        appendText: function(text) {
            $(this).val($(this).val() + text + "\n");
        }
    });

    $('#btn-check').on('click', function () {
        const checkFbLive = new CheckFbLive($('#list_uid').val())

        $('#btn-check').attr('disabled', true)
        $('#list_live').val('')
        $('#list_die').val('')

        checkFbLive.checkLiveWithThreads(
            100,
            function(uid, live) {
                if (live) {
                    $('#live_count').html(checkFbLive.live_count)

                    $('#list_live').appendText(uid);
                } else {
                    $('#die_count').html(checkFbLive.die_count)

                    $('#list_die').appendText(uid);
                }
            },
            function() {
                $('#btn-check').attr('disabled', false)
            }
        )
    })
})
