var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/**
 * es6 | babel
 */
class Get2FaOtp {
    /**
     * @param {string} email
     */
    static validEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    /**
     * @param {string} secret
     */
    static getOtp(secret) {
        return window.otplib.authenticator.generate(secret)
    }

    /**
     * @param {string} textContent
     */
    static getSecrets(textContent) {
        const lines = textContent.split('\n')
        return lines.reduce(
            (secrets, line) => {
                const lineInfo = line.replace(/ /g, '').split('|')
                const title = lineInfo.find(Get2FaOtp.validEmail) || lineInfo[0]
                const secret = [lineInfo[2], lineInfo[0]].find(
                    item => {
                        try {
                            return item &&
                                   item.match(/^[0-9a-zA-Z]{1,}$/) &&
                                   window.otplib.authenticator.decode(item)
                        } catch (error) {
                            return false
                        }
                    }
                )

                if (secret) {
                    secrets.push({ title, secret })
                }

                return secrets
            }, []
        )
    }
}

$(document).ready(function () {
    /**
     * @typedef {{
     *   title: string
     *   secret: string
     *   otp: string
     *   timeout?: number
     * }} OtpInfo
     */

    /**
     * @param {boolean} show
     */
    const toggleTableList = (show) => {
        $('#toggle-2fa-list').toggle(show)
    }

    /**
     * @param {OtpInfo} content
     */
    const renderTableItem = (content) => {
        return `<div class="form-row key2fa">
                    <div class="form-group col-md-3">
                        <label>验证码</label>
                        <div class="input-group mb-3 btn-copy-otp">
                            <input class="form-control faotp" placeholder="验证码" readonly value="${content.otp}">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btn-success btn-tone btn-nw" type="button" data-otp="${content.otp}">
                                    <i class="anticon anticon-key"></i>
                                    复制
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-2 text-center">
                        <label>时间</label>
                        <div class="m-t-10 time2fa">
                            <i class="anticon anticon-clock-circle"></i>
                            ${content.timeout}
                        </div>
                    </div>
                    <div class="form-group col-md-7">
                        <label>2FA</label>
                        <input type="text" class="form-control" readonly placeholder="2FA...." value="${content.secret}">
                    </div>
                </div>`
    }

    /**
     * @param {string} content
     */
    const renderTableList = (content) => {
        $('#toggle-2fa-list').html(
            `<div class="d-flex justify-content-between align-items-center">
                <h5 class="m-b-20">来自2FA的信息</h5>
            </div>` + content
        )
    }

    const renderOtpCodes = () => {
        const items = []
        const textContent = $('#SECRET2FA').val()
        const secrets = Get2FaOtp.getSecrets(textContent)
        const exists = []
        const authOptions = otplib.authenticator.allOptions()
        const timeout = authOptions.step - new Date(authOptions.epoch).getSeconds() % authOptions.step
        for (const { title, secret } of secrets) {
            if (exists.includes(secret)) {
                continue
            }

            exists.push(secret)
            items.push(
                renderTableItem({
                    title,
                    secret,
                    timeout,
                    otp: Get2FaOtp.getOtp(secret)
                })
            )
        }

        renderTableList(items.join(''))
        toggleTableList(Boolean(items.length))

        const next = new Date()
        next.setSeconds(next.getSeconds() + 1)
        next.setMilliseconds(0)
        const nextTimer = time(next) - time()
        // console.log(nextTimer)
        setTimeout(renderOtpCodes, nextTimer)
    }

    /**
     * tick
     */
    renderOtpCodes()

    // $('#SECRET2FA').on('input', function () {
    //     const textContent = $(this).val()
    //     const secrets = Get2FaOtp.getSecrets(textContent)
    //     for (const { title, secret } of secrets) {
    //         codes[secret] = {
    //             title,
    //             secret
    //         }
    //     }
    // })

    $('#toggle-2fa-list').on('click', '.btn-copy-otp', function () {
    const otp = $(this).find('button').attr('data-otp');
    navigator.clipboard.writeText(otp).then(function() {
        toastr.success(`已复制: ${otp}`);
    }).catch(function(error) {
        toastr.error("无法复制 OTP");
    });
});
})


}
/*
     FILE ARCHIVED ON 20:35:39 Feb 27, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:16:10 Oct 17, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.707
  exclusion.robots: 0.034
  exclusion.robots.policy: 0.018
  esindex: 0.017
  cdx.remote: 20.366
  LoadShardBlock: 434.998 (3)
  PetaboxLoader3.datanode: 248.069 (4)
  PetaboxLoader3.resolve: 262.295 (3)
  load_resource: 170.039
*/