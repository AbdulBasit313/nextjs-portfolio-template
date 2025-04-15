'use server'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    const fullname = formData.get('fullname')
    if (!fullname)
      return {
        success: false,
        message: 'Please provide your full name.',
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: 'Please provide your email address.',
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: 'Please provide a message.',
      }

    const res = await fetch(process.env.CONTACT_FORM_ACTION_URL!, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    if (res.ok) {
      return { success: true, message: 'Thanks for your submission!' }
    } else {
      const data = await res.json()
      console.error(data?.error)

      return {
        success: false,
        message: 'Oops! There was a problem submitting your form',
      }
    }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    return {
      success: false,
      message: 'Oops! There was a problem submitting your form',
    }
  }
}

export default action
