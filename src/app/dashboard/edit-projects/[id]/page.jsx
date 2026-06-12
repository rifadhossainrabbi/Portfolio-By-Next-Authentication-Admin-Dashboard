'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  FiArrowLeft,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

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
];

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedTech, setSelectedTech] = useState([]);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isTechOpen, setIsTechOpen] = useState(false);

  const fileInputRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_SERVER;

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${baseUrl}/projects`);
        const allData = await res.json();
        const project = allData.find(p => p._id === id);

        if (project) {
          setTitle(project.title || '');
          setGithubUrl(project.githubUrl || '');
          setLiveLink(project.liveLink || '');
          setDescription(project.description || '');
          setIsPublic(project.isPublic || false);
          setSelectedTech(project.techStack || []);
          setPreview(project.imageUrl || null);
        }
      } catch (error) {
        toast.error('Failed to load project data');
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchProject();
  }, [id, baseUrl]);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUpdating(true);
    const updateToast = toast.loading('Synchronizing changes with kernel...');

    try {
      let finalImageUrl = preview;

      // If new image selected, upload to ImgBB
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
          { method: 'POST', body: formData },
        );
        const imgData = await imgRes.json();
        finalImageUrl = imgData.data.display_url;
      }

      const updatedPayload = {
        title,
        techStack: selectedTech,
        githubUrl,
        liveLink,
        description,
        isPublic,
        imageUrl: finalImageUrl,
      };

      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload),
      });

      if (res.ok) {
        toast.success('Node protocol updated successfully!', {
          id: updateToast,
        });
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Update failed', { id: updateToast });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingData)
    return (
      <div className="h-screen flex items-center justify-center bg-[#050811]">
        <FiLoader className="text-cyan-400 animate-spin" size={40} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-10 px-4"
    >
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-8 text-xs font-black uppercase tracking-widest"
      >
        <FiArrowLeft /> Back to Terminal
      </button>

      <div className="mb-12">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
          Edit <span className="text-cyan-400 text-glow">Node</span>
        </h1>
        <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-[0.3em]">
          Instance ID: {id}
        </p>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        {/* Image Section */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/20 aspect-video md:aspect-[21/9] bg-[#0a101f]"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 uppercase font-black text-xs tracking-widest">
              <FiUploadCloud size={30} className="mb-2" /> No Image Data
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <p className="text-white font-black text-[10px] uppercase tracking-widest">
              Update Visual Buffer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Title */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Project Label
            </label>
            <input
              className="w-full bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 outline-none text-white focus:border-cyan-500/50 transition-all font-bold uppercase"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ENTER TITLE"
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              System Core
            </label>
            <div className="bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 flex flex-wrap gap-2 min-h-[56px]">
              {selectedTech.length > 0 ? (
                selectedTech.map(t => (
                  <span
                    key={t}
                    className="bg-cyan-500/10 text-cyan-400 text-[9px] font-black px-2 py-1 rounded border border-cyan-500/20 flex items-center gap-1"
                  >
                    {t}{' '}
                    <FiX
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedTech(selectedTech.filter(x => x !== t))
                      }
                    />
                  </span>
                ))
              ) : (
                <span className="text-slate-700 font-bold text-[10px] mt-1">
                  NO TECH SELECTED
                </span>
              )}
            </div>
          </div>

          {/* GitHub Link */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              GitHub Repository URL
            </label>
            <div className="flex items-center bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 focus-within:border-cyan-500/50 transition-all">
              <FiGithub className="text-slate-500 mr-3" />
              <input
                className="w-full bg-transparent outline-none text-white text-sm"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Live Link */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Live Deployment Link
            </label>
            <div className="flex items-center bg-[#0a101f] border border-white/10 rounded-xl px-5 py-4 focus-within:border-cyan-500/50 transition-all">
              <FiGlobe className="text-slate-500 mr-3" />
              <input
                className="w-full bg-transparent outline-none text-white text-sm"
                value={liveLink}
                onChange={e => setLiveLink(e.target.value)}
                placeholder="https://project.com/..."
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Module Documentation
          </label>
          <textarea
            rows="5"
            className="w-full bg-[#0a101f] border border-white/10 rounded-2xl p-6 outline-none text-white focus:border-cyan-500/50 transition-all text-sm leading-relaxed"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="SYSTEM ARCHITECTURE DETAILS..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-end gap-4 pt-6 border-t border-white/5">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-10 py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-white/5 transition-all"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-12 py-4 bg-cyan-500 text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 active:scale-95 transition-all disabled:opacity-50"
          >
            {isUpdating ? <FiLoader className="animate-spin" /> : <FiSend />}
            Commit Updates
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProjectPage;
