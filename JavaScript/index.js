// All id and Global variables
const issueContainer = document.getElementById("issue-container");
const issueCountElement = document.getElementById("issue-count");
const searchInput = document.getElementById('search-input');
const loadingSpinner = document.getElementById('loading-spinner');
const modal = document.getElementById('my_modal_1');
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
// issueContainer.innerHTML = "";

if (issueCountElement) {
        issueCountElement.innerText = `${issues.length} `;
    }

 if (issues.length === 0) {
        issueContainer.innerHTML = `<div class="col-span-full text-center py-10"><h1 class="text-2xl font-bold text-gray-400">No Issues Found!</h1></div>`;
        return;
    }

 issues.forEach(allIssues => {

  const allDiv = document.createElement('div');
  allDiv.className = "h-full cursor-pointer";
//   
  const isOpen = allIssues.status === 'open';
  const borderColorClass = isOpen ? 'border-t-green-500' :
  'border-t-purple-500' 
  const statusIcon = isOpen ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';
   const priorityColor = allIssues.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600';
allDiv.innerHTML = `
            <div  class="card h-full flex flex-col bg-white border border-gray-100 shadow-sm rounded-xl p-5 border-t-4 ${borderColorClass} hover:shadow-lg transition-all">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon}" alt="status" class="w-5 h-5">
                    <div class="badge ${priorityColor} text-[12px] font-bold px-3 py-2 uppercase border-none">${allIssues.priority}</div>
                </div>
                <div class="space-y-2 mb-4 flex-grow text-left">
                    <h2 onclick="my_modal_1.showModal()" class="font-bold text-gray-800 text-sm leading-tight line-clamp-1 hover:text-purple-600 cursor-pointer">
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




loadAllIssues()
