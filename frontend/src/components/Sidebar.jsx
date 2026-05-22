import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users, X } from "lucide-react";
import axios from "axios"; 

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const Sidebar = () => {
  const { selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [recentUsers, setRecentUsers] = useState(() => {
    try {
        const saved = localStorage.getItem('recentChats');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Could not load recent chats from localStorage", e);
        return [];
    }
  });

  useEffect(() => {
    // Original getUsers() call removed.
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      
      setIsSearching(true);
      try {
        const { data } = await axios.get(`/api/messages/users/search?q=${term}`); 
        
        // FIX: Ensure data is an array before setting state to prevent TypeError.
        if (Array.isArray(data)) {
            setSearchResults(data);
        } else {
            // Handle unexpected API response format gracefully
            setSearchResults([]); 
            console.error("API returned non-array data:", data);
        }

      } catch (error) {
        console.error("Error fetching search results:", error);
        // FIX: Ensure searchResults is an array on network/API failure
        setSearchResults([]); 
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [] 
  );

  useEffect(() => {
    if (showSearch) {
        debouncedSearch(searchTerm);
    } else {
        setSearchTerm("");
        setSearchResults([]);
    }
  }, [searchTerm, showSearch, debouncedSearch]);


  const handleUserSelect = (user) => {
    setSelectedUser(user);
    
    setRecentUsers(prevRecents => {
        let newRecents = [user, ...prevRecents.filter(u => u._id !== user._id)];
        newRecents = newRecents.slice(0, 10);
        localStorage.setItem('recentChats', JSON.stringify(newRecents));
        return newRecents;
    });
    
    setShowSearch(false);
    setSearchTerm("");
  };

  const isDisplayingSearch = showSearch && (searchTerm.trim() || isSearching);
  
  let displayedUsers = isDisplayingSearch ? searchResults : recentUsers;


  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-3 lg:p-5 flex flex-col gap-2">
        
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <Users className="size-6" />
                <span className="font-medium hidden lg:block">Chat Contacts</span>
            </div>

            <button
                onClick={() => setShowSearch(prev => !prev)}
                className="btn btn-sm btn-ghost p-1"
                aria-label={showSearch ? "Close Search" : "Open Search"}
            >
                {showSearch ? <X className="size-5" /> : <Search className="size-5" />}
            </button>
        </div>
        
        {showSearch && (
            <input
                type="text"
                placeholder="Search by full name..."
                className="input input-bordered input-sm w-full mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
            />
        )}
        
        {!showSearch && (
             <div className="mt-1 hidden lg:block text-xs text-zinc-500">
                 {onlineUsers.length - 1 > 0 ? `${onlineUsers.length - 1} users online` : "No users online"}
            </div>
        )}
        
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        
        <h4 className="text-xs font-semibold uppercase text-zinc-500 px-3 py-1 hidden lg:block">
            {isDisplayingSearch
                ? `Search Results for "${searchTerm}"`
                : "Recent Chats"
            }
        </h4>

        {isSearching && <div className="p-3 text-center">Searching...</div>}
        
        {!isSearching && displayedUsers.length === 0 && (
          <div className="text-center text-zinc-500 mt-5 p-3 text-sm">
            {isDisplayingSearch && searchTerm.trim()
                ? `No results found for "${searchTerm}"`
                : "No recent chats. Use the search icon to find users."
            }
          </div>
        )}


        {!isSearching && displayedUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        
      </div>
    </ aside>
  );
};

export default Sidebar;