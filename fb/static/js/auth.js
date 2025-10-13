let _loading = false
const _authData = { email: '' }
function delayReload() {
    return setTimeout(() => window.location.reload(), 300)
}

/**
 * bind _modal to use
 */
function _toggleDisableAll() {
    _loading = !_loading
    $(this).find('input, button').prop('disabled', _loading)
}

/**
 * register
 */
$(function () {
    const _modal = $('#modalRegister')

    const toggleDisableAll = _toggleDisableAll.bind(_modal)

    function toggleErrorMessage(message) {
        if (message) {
            _modal.find('.alert.alert-danger .error-message').html(message)
        }
        _modal.find('.alert.alert-danger').toggle(Boolean(message))
    }

    function toggleDisableSubmitBtn() {
        if (_modal.find('[name="terms"]').is(':checked')) {
            _modal.find("button#btn-register").removeAttr('disabled')
        } else {
            _modal.find("button#btn-register").attr('disabled', 'disabled')
        }
    }

    function handleRegister(e) {
        e.preventDefault()
        toggleErrorMessage()
        if (_loading) {
            return
        }

        const isAcceptTerm = _modal.find('[name="terms"]').is(':checked')
        if (!isAcceptTerm) {
            return toastr.error('Please accept terms and conditions')
        }

        const payload = {
            email: _modal.find('[name="email"]').val(),
            username: _modal.find('[name="username"]').val(),
            password: _modal.find('[name="password"]').val()
        }

        const url = _modal.find('form').attr('action')

        toggleDisableAll()
        axios
            .post(url, payload)
            .then(response => {
                logoutGapi()
                toastr.success(response?.data?.message)
                return delayReload()
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    const keys = Object.keys(error.response.data.errors)
                    return toggleErrorMessage(error.response.data.errors[keys[0]][0])
                }

                return toggleErrorMessage(error.response?.data?.message)
            })
            .finally(() => toggleDisableAll())
    }

    _modal.find('.alert .alert-icon').on('click', () => toggleErrorMessage())
    _modal.find('[name="terms"]').on('change', toggleDisableSubmitBtn)
    _modal.find('form#form-register').on('submit', handleRegister)
    _modal.find('button#btn-register').on('click', handleRegister)
    _modal.on('hide.bs.modal', function () {
        _modal.find('[name="email"]').val('')
        _modal.find('[name="username"]').val('')
        _modal.find('[name="password"]').val('')
        _modal.find('[name="terms"]').prop('checked', true).change()
    })

    toggleDisableSubmitBtn()
    toggleErrorMessage()
})

/**
 * login
 */
$(function () {
    const _modal = $('#modalLogin')

    const toggleDisableAll = _toggleDisableAll.bind(_modal)

    function toggleErrorMessage(message) {
        if (message) {
            _modal.find('.alert.alert-danger .error-message').html(message)
        }
        _modal.find('.alert.alert-danger').toggle(Boolean(message))
    }

    function handleLogin(e) {
        e.preventDefault()
        toggleErrorMessage()
        if (_loading) {
            return
        }

        const payload = {
            username: _modal.find('[name="username"]').val(),
            password: _modal.find('[name="password"]').val(),
            remember: _modal.find('[name="remember"]').is(':checked'),
        }

        const url = _modal.find('form').attr('action')

        toggleDisableAll()
        axios
            .post(url, payload)
            .then(response => {
                logoutGapi()
                toastr.success(response?.data?.message)
                return delayReload()
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    const keys = Object.keys(error.response.data.errors)
                    return toggleErrorMessage(error.response.data.errors[keys[0]][0])
                }

                return toggleErrorMessage(error.response?.data?.message)
            })
            .finally(() => toggleDisableAll())
    }

    _modal.find('.alert .alert-icon').on('click', () => toggleErrorMessage())
    _modal.find('form#form-login').on('submit', handleLogin)
    _modal.find('button#btn-login').on('click', handleLogin)
    _modal.on('hide.bs.modal', function () {
        _modal.find('[name="username"]').val('')
        _modal.find('[name="password"]').val('')
        _modal.find('[name="remember"]').prop('checked', true).change()
        toggleErrorMessage()
    })

    toggleErrorMessage()
})

/**
 * forgot password
 */
$(function () {
    const _modal = $('#modalForgotPassword')

    const toggleDisableAll = _toggleDisableAll.bind(_modal)

    function toggleErrorMessage(message) {
        if (message) {
            _modal.find('.alert.alert-danger .error-message').html(message)
        }
        _modal.find('.alert.alert-danger').toggle(Boolean(message))
    }

    function handleForgotPassword(e) {
        e.preventDefault()
        toggleErrorMessage()
        if (_loading) {
            return
        }

        const payload = {
            email: _modal.find('[name="email"]').val()
        }

        const url = _modal.find('form').attr('action')

        toggleDisableAll()
        axios
            .post(url, payload)
            .then(response => {
                _authData.email = payload.email
                _modal.modal('hide')
                $('#modalResetPassword').modal('show')
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    const keys = Object.keys(error.response.data.errors)
                    return toggleErrorMessage(error.response.data.errors[keys[0]][0])
                }

                return toggleErrorMessage(error.response?.data?.message)
            })
            .finally(() => toggleDisableAll())
    }

    _modal.find('.alert .alert-icon').on('click', () => toggleErrorMessage())
    _modal.find('form#form-forgot-password').on('submit', handleForgotPassword)
    _modal.on('hide.bs.modal', function () {
        _modal.find('[name="email"]').val('')
        toggleErrorMessage()
    })

    toggleErrorMessage()
})

/**
 * reset password
 */
$(function () {
    const _modal = $('#modalResetPassword')

    const toggleDisableAll = _toggleDisableAll.bind(_modal)

    function toggleErrorMessage(message) {
        if (message) {
            _modal.find('.alert.alert-danger .error-message').html(message)
        }
        _modal.find('.alert.alert-danger').toggle(Boolean(message))
    }

    function handleResetPassword(e) {
        e.preventDefault()
        toggleErrorMessage()
        if (_loading) {
            return
        }

        const payload = {
            email: _authData.email,
            otp: _modal.find('[name="otp"]').val(),
            password: _modal.find('[name="password"]').val()
        }

        const url = _modal.find('form').attr('action')

        toggleDisableAll()
        axios
            .post(url, payload)
            .then(response => {
                _modal.modal('hide')
                $('#modalLogin').modal('show')
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    const keys = Object.keys(error.response.data.errors)
                    return toggleErrorMessage(error.response.data.errors[keys[0]][0])
                }

                return toggleErrorMessage(error.response?.data?.message)
            })
            .finally(() => toggleDisableAll())
    }

    _modal.find('.alert .alert-icon').on('click', () => toggleErrorMessage())
    _modal.find('form#form-reset-password').on('submit', handleResetPassword)
    _modal.on('hide.bs.modal', function () {
        _modal.find('[name="otp"]').val('')
        _modal.find('[name="password"]').val('')
        toggleErrorMessage()
    })

    toggleErrorMessage()
})

/**
 * google handle
 */
$(function () {
    const _modal = $('#modalGgSuccess')

    const toggleDisableAll = _toggleDisableAll.bind(_modal)

    function toggleErrorMessage(message) {
        if (message) {
            _modal.find('.alert.alert-danger .error-message').html(message)
        }
        _modal.find('.alert.alert-danger').toggle(Boolean(message))
    }

    function handleResetPassword(e) {
        e.preventDefault()
        toggleErrorMessage()
        if (_loading) {
            return
        }

        const payload = {
            token: _modal.find('[name="token"]').val(),
            username: _modal.find('[name="username"]').val()
        }

        const url = _modal.find('form').attr('action')

        toggleDisableAll()
        axios
            .post(url, payload)
            .then(response => {
                logoutGapi()
                toastr.success(response?.data?.message)
                return delayReload()
            })
            .catch(error => {
                if (error?.response?.data?.errors) {
                    const keys = Object.keys(error.response.data.errors)
                    return toggleErrorMessage(error.response.data.errors[keys[0]][0])
                }

                return toggleErrorMessage(error.response?.data?.message)
            })
            .finally(() => toggleDisableAll())
    }

    _modal.find('.alert .alert-icon').on('click', () => toggleErrorMessage())
    _modal.find('form#form-gg-success').on('submit', handleResetPassword)
    toggleErrorMessage()

    /**
     * cancel google sign in
     */
    _modal.on('hide.bs.modal', function () {
        _modal.find('[name="token"]').val('')
        _modal.find('[name="username"]').val('')
        logoutGapi()
    })

    /**
     * START: trigger click events
     */
    $('#btn-login-gg').on('click', function () {
        $('#btn-login-gg-hidden > div').trigger('click')
    })
    $('#btn-register-gg').on('click', function () {
        $('#btn-register-gg-hidden > div').trigger('click')
    })
    /**
     * END: trigger click events
     */
})

function logoutGapi() {
    gapi.load(
        'auth2',
        () => gapi.auth2
            .init()
            .then(() => gapi.auth2.getAuthInstance().signOut())
            .catch(console.error)
    )
}

function onGoogleSignIn(googleUser) {
    const _modal = $('#modalGgSuccess')
    const url = _modal.find('form').attr('action')
    const payload = { token: googleUser.getAuthResponse().id_token }
    axios
        .post(url, payload)
        .then(({ data }) => {
            if (data.logged_in) {
                logoutGapi()
                toastr.success(data.message)
                return delayReload()
            }

            $('#modalLogin').modal('hide')
            $('#modalRegister').modal('hide')
            _modal.find('[name="token"]').val(payload.token)
            _modal.modal('show')
        })
        .catch(error => toastr.error(error?.response?.data?.message || error.message))
}
