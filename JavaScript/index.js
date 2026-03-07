
const issueContainer = document.getElementById("issue-container");
const issueCountElement = document.getElementById("issue-count"); 

const loadAllIssues = async () => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();

    // 1. Data load holei spinner- hide
    issueContainer.innerHTML = ""; 

    // 2. Total count update 
    if (issueCountElement) {
        issueCountElement.innerText = data.data.length;
    }

    data.data.forEach(allIssues => {
        const allDiv = document.createElement('div');

        // 3. Status logic: File naming thik koro (Kono space thakbe na)
        const isOpen = allIssues.status === 'open';
        const borderColorClass = isOpen ? 'border-t-green-500' : 'border-t-purple-500';
        const statusIcon = isOpen ? 'assets/Open-Status.png' : 'assets/Closed-Status.png';

        // 4. Priority colors
        const priorityColor = allIssues.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600';

        allDiv.innerHTML = `
            <div class="card h-full  bg-white border border-gray-100 shadow-sm rounded-xl p-5 border-t-4 ${borderColorClass}">
                <div class="flex justify-between items-center mb-3">
                    <img src="${statusIcon}" alt="status" class="w-5 h-5">
                    <div class="badge ${priorityColor} text-[10px] font-bold px-3 py-2 uppercase border-none">
                        ${allIssues.priority}
                    </div>
                </div>

                <div class="space-y-2 mb-4">
                    <h2 class="font-bold text-gray-800 text-sm leading-tight hover:text-purple-600 cursor-pointer">
                        ${allIssues.title}
                    </h2>
                    <p class=" text-gray-500 line-clamp-2">
                        ${allIssues.description}
                    </p>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="badge badge-outline border-red-200 font-bold text-red-500 text-[12px] py-2 px-3 bg-red-50">
                       ${allIssues.labels[0]}
                    </span>
                    <span class="badge badge-outline border-orange-200 text-orange-500 text-[12px] font-bold py-2 px-3 bg-orange-50">
                       ${allIssues.labels[1] || 'General'}
                    </span>
                </div>

                <hr class="border-gray-100 mb-3">

                <div class="space-y-1">
                    <p class=" font-medium text-gray-600">#1 by ${allIssues.author}</p>
                    <p class=" text-gray-400">
                        ${new Date(allIssues.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        `;
        
        issueContainer.appendChild(allDiv);
    });
};

loadAllIssues();