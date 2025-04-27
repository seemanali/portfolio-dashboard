async function imageuploadFunction(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tdmt92rd');
    formData.append('cloud_name', 'dyhtmxiiz');
    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dyhtmxiiz/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        let data = await response.json()
        return { status: true, data }
    } catch (error) {
        return { status: false, error }
    }
}

export default imageuploadFunction;