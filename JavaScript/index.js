// All id and Global variables
const issueContainer = document.getElementById("issue-container");
const issueCountElement = document.getElementById("issue-count");
const searchInput = document.getElementById('search-input');
const loadingSpinner = document.getElementById('loading-spinner');
const modalContainer = document.getElementById('modal-content');
let allDataArray = []; 

const showLoading = () => {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    
    
}
const hideLoading = () => {
    loadingSpinner.classList.add('hidden')
}

// Fetch All Issues from API
const loadAllIssues = async () => {
      issueContainer.innerHTML = "";
     showLoading();
    try {
        
       
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        allDataArray = data.data;
        displayIssues(allDataArray);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
    hideLoading()
};
// Display Function (Dynamic Card Rendering)
const displayIssues =  (issues) => {


if (issueCountElement) {
        issueCountElement.innerText = `${issues.length} `;
    }

 if (issues.length === 0) {
        issueContainer.innerHTML = `<div class="col-span-full text-center py-10"><h1 class="text-2xl font-bold text-gray-400">No Issues Found!</h1></div>`;
        return;
    }
    issueContainer.innerHTML = '';

 issues.forEach(allIssues => {

  const allDiv = document.createElement('div');
  allDiv.className = "h-full cursor-pointer";
 
  const isOpen = allIssues.status === 'open';
  const borderColorClass = isOpen ? 'border-t-green-500' :
  'border-t-purple-500' 
  const statusIcon = isOpen ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';
   const priorityColor = allIssues.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600';
allDiv.innerHTML = `
            <div onclick="showIssueDetails('${allIssues.id}')"   class="card h-full flex flex-col bg-white border border-gray-100 shadow-sm rounded-xl p-5 border-t-4 ${borderColorClass} hover:shadow-lg transition-all">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon}" alt="status" class="w-5 h-5">
                    <div class="badge ${priorityColor} text-[12px] font-bold px-3 py-2 uppercase border-none">${allIssues.priority}</div>
                </div>
                <div class="space-y-2 mb-4 flex-grow text-left">
                    <h2 class="font-bold text-gray-800 text-sm leading-tight line-clamp-1 hover:text-purple-600 cursor-pointer">
                        ${allIssues.title}
                    </h2>
                    <p class="text-xs text-gray-500 line-clamp-2">${allIssues.description}</p>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="badge badge-outline border-red-200 text-red-500 text-[12px] font-bold py-2 px-3 bg-red-50">${allIssues.labels[0] || 'Bug'}</span>
                    <span class="badge badge-outline border-orange-200 text-orange-500 text-[12px] py-2 px-3 bg-orange-50 font-bold">${allIssues.labels[1] || 'Help Wanted'}</span>
                </div>
                <hr class="border-gray-100 mb-3">
                <div class="mt-auto space-y-1 text-left">
                    <p class=" font-medium text-gray-600">#1 by ${allIssues.author}</p>
                    <p class=" text-gray-400">${new Date(allIssues.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
issueContainer.appendChild(allDiv);

    
 });

}

//  Filter by Status Logic
const filterByStatus = (status, event) => {
     issueContainer.innerHTML = "";
    showLoading();
    
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
    });

    event.target.classList.add('bg-purple-600', 'text-white');
    event.target.classList.remove('bg-white', 'text-gray-700');

    if (status === 'all') {
        displayIssues(allDataArray);
    } else {
        const filteredData = allDataArray.filter(item => item.status === status);
        displayIssues(filteredData);
    }
      setTimeout(() => {
        if (status === 'all') {
            displayIssues(allDataArray);
        } else {
            const filteredData = allDataArray.filter(item => item.status === status);
            displayIssues(filteredData);
        }
        hideLoading(); 
    }, );


};
// =================  Modal Logic =============
const showIssueDetails = async (id) => {
  
const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
const data = await res.json();
 console.log("API Response:", data); 
const issue = data.data;
  console.log("Issue:", issue); 
document.getElementById('my_modal_1').showModal();
// const modalDiv = document.createElement('div')
modalContainer.innerHTML = `
<h1 class="text-3xl font-extrabold text-[#1F2937] mb-4">${issue.title}</h1>
            
            <div class="flex items-center gap-3 mb-6 text-gray-500 text-sm">
                <span class="bg-[#22C55E] text-white px-3 py-1 rounded-full font-semibold flex items-center gap-1 text-[10px]">
                    <i class="fa-regular fa-circle-dot"></i> Opened
                </span>
                <span>• Opened by <span class="font-medium text-gray-700">${issue.author}</span></span>
                <span>• ${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>

            <div class="flex gap-2 mb-8">
                <span class="bg-red-50 text-red-500 border border-red-100 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <i class="fa-solid fa-bug"></i> ${issue.labels[0] || 'BUG'}
                </span>
                <span class="bg-orange-50 text-orange-500 border border-orange-100 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <i class="fa-solid fa-handshake-angle"></i> HELP WANTED
                </span>
            </div>

            <p class="text-gray-600 text-lg leading-relaxed mb-10 text-left">
                ${issue.description}
            </p>

            <div class="bg-gray-50 rounded-xl p-6 flex justify-between items-center">
                <div class="text-left">
                    <p class="text-gray-400 text-sm mb-1 uppercase font-bold">Assignee:</p>
                    <p class="font-bold text-gray-800 text-lg">${issue.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-gray-400 text-sm mb-1 uppercase font-bold">Priority:</p>
                    <span class="bg-red-500 text-white px-4 py-1 rounded-lg font-bold text-xs uppercase tracking-wider">
                        ${issue.priority}
                    </span>
                </div>
            </div>

`;

// modalContainer.appendChild(modalDiv)

}
// =====  Search Issue ========
searchInput.addEventListener('input', async (event) => {
 const searchText = event.target.value;
 if(searchText === ""){

    displayIssues(allDataArray);
    return;
 }

 const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
 const data = await res.json();
 displayIssues(data.data)

});


loadAllIssues()
