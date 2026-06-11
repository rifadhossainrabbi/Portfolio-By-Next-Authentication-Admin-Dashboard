'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUploadCloud,
  FiGithub,
  FiGlobe,
  FiSend,
  FiChevronDown,
  FiX,
  FiCheck,
  FiLoader,
} from 'react-icons/fi';
import { creatProjects } from '@/lib/action/projects';
import toast from 'react-hot-toast'; // react-hot-toast ইমপোর্ট করুন

const TECH_OPTIONS = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'MongoDB',
  'Prisma',
  'Framer Motion',
  'Redux',
  'Firebase',
  'Supabase',
  'PostgreSQL',
];

const AddProjectsPage = () => {
  const [title, setTitle] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [enableTelemetry, setEnableTelemetry] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedTech, setSelectedTech] = useState([]);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const techStackRef = useRef(null);
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        techStackRef.current &&
        !techStackRef.current.contains(event.target)
      ) {
        setIsTechOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTech = tech => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter(t => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const removeTech = tech => {
    setSelectedTech(selectedTech.filter(t => t !== tech));
  };

  const uploadToImgBB = async file => {
    if (!IMGBB_API_KEY) {
      toast.error('API Key missing!');
      return null;
    }
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) return data.data.display_url;
      throw new Error(data.error.message || 'Upload Failed');
    } catch (error) {
      console.error('ImgBB Error:', error);
      return null;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!image) {
      toast.error('Please upload a project photo.');
      return;
    }

    setIsUploading(true);
    const uploadToast = toast.loading('Uploading image to cloud...'); // লোডিং টোস্ট

    const uploadedImageUrl = await uploadToImgBB(image);

    if (uploadedImageUrl) {
      toast.success('Image uploaded!', { id: uploadToast }); // আগের টোস্ট আপডেট

      const finalPayload = {
        title,
        techStack: selectedTech,
        githubUrl,
        liveLink,
        description,
        isPublic,
        enableTelemetry,
        imageUrl: uploadedImageUrl,
      };

      try {
        await creatProjects(finalPayload);
        toast.success('Project published successfully! 🚀');

        // রিসেট ফর্ম
        setPreview(null);
        setImage(null);
        setSelectedTech([]);
        setTitle('');
        setGithubUrl('');
        setLiveLink('');
        setDescription('');
      } catch (error) {
        toast.error('Deployment failed. Try again.');
      }
    } else {
      toast.error('Image upload failed.', { id: uploadToast });
    }
    setIsUploading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-10 px-4 md:px-0"
    >
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-black text-cyan-400 tracking-tighter uppercase italic drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Initialize Project
          </h1>
          <p className="text-[11px] text-slate-500 mt-4 max-w-xl leading-relaxed font-bold uppercase tracking-widest">
            Provisioning new repository instance. Secure system initialized.
          </p>
        </div>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        <div
          onClick={() => !isUploading && fileInputRef.current.click()}
          className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/20 hover:border-cyan-500/50 transition-all aspect-video md:aspect-[21/9] bg-[#0a101f] ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          {preview ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {!isUploading && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-cyan-500 text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">
                    Change Image
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-gradient-to-b from-transparent to-cyan-500/5">
              <FiUploadCloud size={32} className="text-cyan-400 mb-4" />
              <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest">
                Select Project Photo
              </h3>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
              <FiLoader className="text-cyan-400 animate-spin mb-2" size={40} />
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                Uploading...
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Project Title
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 focus-within:border-cyan-500/50 transition-all">
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="PROJECT NAME"
                className="w-full bg-transparent outline-none text-sm font-bold text-white uppercase"
              />
            </div>
          </div>

          <div className="space-y-3 relative" ref={techStackRef}>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Tech Stack
            </label>
            <div
              onClick={() => setIsTechOpen(!isTechOpen)}
              className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between group cursor-pointer hover:border-cyan-500/30 min-h-[54px]"
            >
              <div className="flex flex-wrap gap-2">
                {selectedTech.length > 0 ? (
                  selectedTech.map(tech => (
                    <span
                      key={tech}
                      className="bg-cyan-500/10 text-cyan-400 text-[9px] font-black px-2 py-1 rounded flex items-center gap-1 border border-cyan-500/20"
                    >
                      {tech}{' '}
                      <FiX
                        className="cursor-pointer hover:text-white"
                        onClick={e => {
                          e.stopPropagation();
                          removeTech(tech);
                        }}
                      />
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-bold text-slate-700 uppercase">
                    Select Technologies
                  </span>
                )}
              </div>
              <FiChevronDown
                className={`text-slate-600 transition-transform ${isTechOpen ? 'rotate-180' : ''}`}
              />
            </div>
            <AnimatePresence>
              {isTechOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-2 bg-[#0d1526] border border-white/10 rounded-xl p-2 max-h-60 overflow-y-auto no-scrollbar shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {TECH_OPTIONS.map(tech => (
                      <div
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase cursor-pointer rounded-lg flex items-center justify-between ${selectedTech.includes(tech) ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:bg-white/5'}`}
                      >
                        {tech} {selectedTech.includes(tech) && <FiCheck />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              GitHub URL
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4">
              <FiGithub className="text-slate-600" />
              <input
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="GITHUB LINK"
                className="w-full bg-transparent outline-none text-sm font-bold text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Live Link
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4">
              <FiGlobe className="text-slate-600" />
              <input
                type="url"
                value={liveLink}
                onChange={e => setLiveLink(e.target.value)}
                placeholder="DEPLOYED LINK"
                className="w-full bg-transparent outline-none text-sm font-bold text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Description
          </label>
          <div className="bg-[#0a101f] border border-white/10 rounded-2xl p-6">
            <textarea
              rows="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ARCHITECTURE DETAILS..."
              className="w-full bg-transparent outline-none text-sm font-bold text-white no-scrollbar resize-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={e => setIsPublic(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-black checked:bg-cyan-500 appearance-none border cursor-pointer"
              />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Public
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableTelemetry}
                onChange={e => setEnableTelemetry(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-black checked:bg-cyan-500 appearance-none border cursor-pointer"
              />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Telemetry
              </span>
            </label>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              type="reset"
              onClick={() => {
                setPreview(null);
                setImage(null);
                setSelectedTech([]);
                setTitle('');
                setGithubUrl('');
                setLiveLink('');
                setDescription('');
              }}
              className="flex-1 md:flex-none px-10 py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-white/5"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`flex-1 md:flex-none px-12 py-4 bg-cyan-500 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${isUploading ? 'opacity-50 cursor-wait' : 'hover:bg-cyan-400 active:scale-95'}`}
            >
              {isUploading ? <FiLoader className="animate-spin" /> : <FiSend />}
              {isUploading ? 'Uploading...' : 'Publish Project'}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProjectsPage;
