import React, { useState } from "react";
import SearchModal from "./SearchModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBriefcase, faMapMarkerAlt, faBan, faGraduationCap, faBuilding, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const LinkedIn = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [currentEmployer, setCurrentEmployer] = useState("");
  const [savedSearches, setSavedSearches] = useState(() => {
    const searches = localStorage.getItem("savedSearches");
    return searches ? JSON.parse(searches) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState("");

  const generateLink = () => {
    const baseURL = "https://www.google.com/search?q=";
    const query = [
      jobTitle ? `"${jobTitle}"` : "",
      location ? `"${location}"` : "",
      `site:in.linkedin.com/in/ OR site:in.linkedin.com/pub/`,
      `-intitle:"profiles"`,
      `-inurl:"dir/"`,
      currentEmployer ? `"Current * ${currentEmployer}"` : "",
      keywords ? `-"${keywords}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `${baseURL}${encodeURIComponent(query)}`;
  };

  const handleSearchClick = () => {
    const query = generateLink();
    setGeneratedQuery(query);
    setIsModalOpen(true);
  };

  const handleSaveSearch = () => {
    const link = generatedQuery;
    if (link && !savedSearches.some((search) => search.link === link)) {
      const updatedSearches = [...savedSearches, { jobTitle, link }];
      setSavedSearches(updatedSearches);
      localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
      setIsModalOpen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedQuery);
    setIsModalOpen(false);
  };

  const handleGoToGoogle = () => {
    window.open(generatedQuery, "_blank");
  };

  const handleDeleteSearch = (index) => {
    const updatedSearches = savedSearches.filter((_, i) => i !== index);
    setSavedSearches(updatedSearches);
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="relative flex flex-col md:flex-row to-gray-700 items-start justify-between p-8 mx-auto w-full pb-12 ">

      {/* Left side form */}
      <div className="relative z-10 w-full md:w-2/3 px-4 border-r-2 border-white/20">
        <h1 className="text-4xl font-extrabold mb-6 text-white">
          Find LinkedIn Profiles with Ease
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., United States"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Job Title:</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., Software Engineer"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Location or Keywords:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., San Francisco, Remote"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Exclude Keywords:</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., Manager, Executive"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faBan} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Education:</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., Bachelor's, Master's"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
          </div>
          <div className="relative flex flex-col">
            <label className="font-semibold text-white mb-2">Current Employer:</label>
            <input
              type="text"
              value={currentEmployer}
              onChange={(e) => setCurrentEmployer(e.target.value)}
              className="p-4 bg-white/10 text-white border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white/70 transition-all duration-300"
              placeholder="e.g., Google, Microsoft"
            />
            <div className="absolute top-3/4 right-6 text-xl transform -translate-y-3/4 text-white/40 pointer-events-none">
              <FontAwesomeIcon icon={faBuilding} />
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:from-cyan-400 hover:to-blue-500 transition duration-300 transform hover:scale-105"
          >
            Find the Right People on LinkedIn
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-1/3 mx-auto md:pl-8 mt-12 md:mt-0">
        <h2 className="text-2xl font-bold text-white mb-4">Saved Searches</h2>
        <div className="space-y-4">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-80"
              >
                <span
                  onClick={() => handleGoToGoogle(search.link)}
                  className="text-white font-medium truncate hover:underline hover:cursor-pointer"
                >
                  {search.jobTitle}
                </span>
                <div
                  className="space-x-4 text-white/80 hover:cursor-pointer"
                  onClick={() => handleDeleteSearch(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/70">No saved searches yet.</p>
          )}
        </div>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        query={generatedQuery}
        onCopy={handleCopyLink}
        onSave={handleSaveSearch}
        onOpen={handleGoToGoogle}
      />
    </div>
  );
};

export default LinkedIn;
