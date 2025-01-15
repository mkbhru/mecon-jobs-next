const a = [
  {
    id: 101,
    is_visible: 1,
    sort_order: 1,
    name: "Termination of agreement for engagement on contractual basis",
    created_at: "2025-01-07T06:05:45.000Z",
    originalIndex: 1,
  },
  {
    id: 102,
    is_visible: 1,
    sort_order: 2,
    name: "RECRUITMENT OF EXECUTIVES IN THE REGULAR SCALE OF PAY",
    created_at: "2025-01-07T06:26:22.000Z",
    originalIndex: 2,
  },
  {
    id: 104,
    is_visible: 0,
    sort_order: 3,
    name: "Sample Hidden Advertisement",
    created_at: "2025-01-09T13:24:00.000Z",
    originalIndex: 4,
  },
  {
    id: 103,
    is_visible: 1,
    sort_order: 4,
    name: "RECRUITMENT FOR CONTRACTUAL ENGAGEMENT OF MEDICAL PROFESSIONALS ON PART TIME BASIS THROUGH WALK -IN-INTERVIEW",
    created_at: "2025-01-07T07:37:24.000Z",
    originalIndex: 3,
  },
];

a.map((item, index) => {
  console.log(item.id, item.originalIndex);
});
