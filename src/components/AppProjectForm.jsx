import { useState, useRef } from 'react';
import {
    Upload, X, Plus, Trash2, Image,
    Smartphone, Globe, Chrome, Zap,
    Code, Github, ExternalLink, Download,
    Star, Type, Hash, List, Link, BarChart2
} from 'lucide-react';
import imageuploadFunction from '../AppwriteService/cloudinary';
import uploadapp from '../AppwriteService/UploadApp';
import { useNavigate } from 'react-router-dom';

const AppProjectForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        tagline: '',
        problem: '',
        solution: '',
        description: '',
        projectType: 'mobile',
        technologies: [],
        features: [''],
        techStack: [''],
        githubUrl: '',
        demoUrl: '',
        downloadUrl: '',
        isFeatured: false,
        downloads: '',
        rating: '',
    });

    // Media state
    const [screenshots, setScreenshots] = useState([]);
    const [screenshotsURL, setScreenshotsURL] = useState([])
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerURL, setBannerURL] = useState(null)
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [appIcon, setAppIcon] = useState(null);

    // Input refs
    const fileInputRef = useRef(null);
    const bannerInputRef = useRef(null);
    const iconInputRef = useRef(null);

    // Temporary inputs
    const [newTech, setNewTech] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [newStackItem, setNewStackItem] = useState('');

    // Form handlers
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Media handlers
    const handleScreenshotUpload = (e) => {
        const files = Array.from(e.target.files);
        if (screenshots.length + files.length > 10) {
            alert('Maximum 10 screenshots allowed');
            return;
        }
        setScreenshots(prev => [...prev, ...files]);
    };


    const handleImagesUploadOnCloudinary = async () => {

        try {
            if (screenshots.length == 0) return alert("No Images are available to upload")
            for (const items of screenshots) {
                alert("Uploading the image")
                const response = await imageuploadFunction(items);
                if (response.status) {
                    setScreenshotsURL(prev => [...prev, response.data.secure_url])
                    console.log(response.data)
                }
                else {
                    console.error("Error While uploading all", response.error)
                }
            }
            alert("All images Uploaded")
        } catch (error) {
            console.log("Error Uploading Images on cloudinary", error)
        }
    }


    const removeScreenshot = (index) => {
        setScreenshots(prev => prev.filter((_, i) => i !== index));
    };

    const handleBannerUpload = async (e) => {

        const response = await imageuploadFunction(e.target.files[0])
        if (response.status) {
            setBannerURL(response.data.secure_url)
            setBannerImage(e.target.files[0]);
        }
    };



    const handleIconUpload = (e) => {
        setAppIcon(e.target.files[0]);
    };

    // Dynamic list handlers
    const addTechnology = () => {
        if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, newTech.trim()]
            }));
            setNewTech('');
        }
    };

    const removeTechnology = (tech) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== tech)
        }));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addTechStackItem = () => {
        if (newStackItem.trim()) {
            setFormData(prev => ({
                ...prev,
                techStack: [...prev.techStack, newStackItem.trim()]
            }));
            setNewStackItem('');
        }
    };

    const removeTechStackItem = (index) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack.filter((_, i) => i !== index)
        }));
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate required fields
        // if (!formData.title || !bannerImage || screenshotsURL.length === 0) {
        //     alert('Please fill all required fields');
        //     return;
        // }

        alert("Uploading your data")
        const response = await uploadapp.createApp(
            {
                title: formData.title,
                tagline: formData.tagline,
                problem: formData.problem,
                solution: formData.solution,
                features: JSON.stringify(formData.features),
                techstack: JSON.stringify(formData.techStack),
                livedemo: formData.demoUrl,
                github: formData.githubUrl,
                download: formData.downloadUrl,
                screenshots: screenshotsURL,
                banner: bannerURL,
                featured: formData.isFeatured,
                technology: JSON.stringify(formData.technologies)
            }
        )
        if (response.success) {
            navigate("/")
        } else {
            console.error("Error", response.error)
        }


    };


    const navigate = useNavigate()

    // Form sections
    const formSections = [
        {
            title: "Basic Information",
            icon: <Type className="h-5 w-5" />,
            fields: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tagline*</label>
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type*</label>
                        <div className="flex space-x-4">
                            {[
                                { value: 'mobile', label: 'Mobile', icon: Smartphone },
                                { value: 'web', label: 'Web', icon: Globe },
                                { value: 'extension', label: 'Extension', icon: Chrome }
                            ].map((type) => (
                                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="projectType"
                                        value={type.value}
                                        checked={formData.projectType === type.value}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <type.icon className="h-5 w-5 text-gray-700" />
                                    <span>{type.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-2 block text-sm text-gray-700">Featured Project</label>
                    </div>
                </div>
            )
        },
        {
            title: "Project Details",
            icon: <List className="h-5 w-5" />,
            fields: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement*</label>
                        <textarea
                            name="problem"
                            value={formData.problem}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Solution*</label>
                        <textarea
                            name="solution"
                            value={formData.solution}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            )
        },
        {
            title: "Technologies",
            icon: <Code className="h-5 w-5" />,
            fields: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (displayed as tags)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.technologies.map((tech) => (
                                <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTechnology(tech)}
                                        className="ml-1.5 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTechnology()}
                                placeholder="Add technology"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addTechnology}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack Details</label>
                        <div className="space-y-2 mb-2">
                            {formData.techStack.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                        {item}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeTechStackItem(index)}
                                        className="ml-2 p-2 text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                value={newStackItem}
                                onChange={(e) => setNewStackItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTechStackItem()}
                                placeholder="Add tech stack item"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addTechStackItem}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
                        <div className="space-y-2 mb-2">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => updateFeature(index, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="ml-2 p-2 text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                                placeholder="Add feature"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Project Links",
            icon: <Link className="h-5 w-5" />,
            fields: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository URL</label>
                        <input
                            type="url"
                            name="githubUrl"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                        <input
                            type="url"
                            name="demoUrl"
                            value={formData.demoUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Download URL (if applicable)</label>
                        <input
                            type="url"
                            name="downloadUrl"
                            value={formData.downloadUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            )
        },
        {
            title: "Project Stats",
            icon: <BarChart2 className="h-5 w-5" />,
            fields: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Downloads (e.g., 10K+)</label>
                        <input
                            type="text"
                            name="downloads"
                            value={formData.downloads}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (e.g., 4.8)</label>
                        <input
                            type="text"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            )
        },
        {
            title: "Media Uploads",
            icon: <Image className="h-5 w-5" />,
            fields: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image* (1200×600)</label>
                        <MediaUpload
                            file={bannerImage}
                            inputRef={bannerInputRef}
                            onChange={handleBannerUpload}
                            onRemove={() => setBannerImage(null)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">App Icon (Optional)</label>
                        <MediaUpload
                            file={appIcon}
                            inputRef={iconInputRef}
                            onChange={handleIconUpload}
                            onRemove={() => setAppIcon(null)}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Screenshots* (3-10 images)</label>
                        <ScreenshotUpload
                            screenshots={screenshots}
                            inputRef={fileInputRef}
                            onChange={handleScreenshotUpload}
                            onRemove={removeScreenshot}
                            required
                        />
                    </div>
                    <button
                        type='button'

                        className='bg-blue-700 text-white p-4'
                        onClick={handleImagesUploadOnCloudinary}
                    >Upload Images</button>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Upload New Project</h1>
                <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${formData.isFeatured
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {formData.isFeatured ? 'Featured' : 'Regular'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${formData.projectType === 'mobile' ? 'bg-blue-100 text-blue-800' :
                        formData.projectType === 'web' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                        }`}>
                        {formData.projectType === 'mobile' ? 'Mobile' :
                            formData.projectType === 'web' ? 'Web' : 'Extension'}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {formSections.map((section, index) => (
                    <div key={index} className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            {section.icon}
                            <h2 className="text-xl font-semibold text-gray-900 ml-2">{section.title}</h2>
                        </div>
                        {section.fields}
                    </div>
                ))}

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Project
                    </button>
                </div>
            </form>
        </div>
    );
};

// Reusable Media Upload Component
const MediaUpload = ({ file, inputRef, onChange, onRemove, required }) => {
    return (
        <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors h-40 flex items-center justify-center"
            onClick={() => inputRef.current.click()}
        >
            {file ? (
                <div className="relative w-full h-full">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-md"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                        <X className="h-4 w-4 text-gray-700" />
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    <Upload className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload</p>
                    {required && <p className="text-xs text-gray-500">Required</p>}
                </div>
            )}
            <input
                type="file"
                ref={inputRef}
                onChange={onChange}
                accept="image/*"
                className="hidden"
                required={required}
            />
        </div>
    );
};

// Screenshot Upload Component
const ScreenshotUpload = ({ screenshots, inputRef, onChange, onRemove, required }) => {
    return (
        <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => inputRef.current.click()}
        >
            {screenshots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {screenshots.map((file, index) => (
                        <div key={index} className="relative aspect-video">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-full object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(index);
                                }}
                                className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-sm hover:bg-gray-100"
                            >
                                <X className="h-3 w-3 text-gray-700" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                    {screenshots.length < 10 && (
                        <div className="aspect-video border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center text-gray-400">
                            <Plus className="h-8 w-8" />
                            <span className="text-xs mt-1">Add more</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2">Click to upload screenshots (3-10 images)</p>
                    {required && <p className="text-xs text-gray-500 mt-1">At least 3 screenshots required</p>}
                </div>
            )}
            <input
                type="file"
                ref={inputRef}
                onChange={onChange}
                accept="image/*"
                multiple
                className="hidden"
                required={required && screenshots.length === 0}
            />
        </div>
    );
};

export default AppProjectForm;
