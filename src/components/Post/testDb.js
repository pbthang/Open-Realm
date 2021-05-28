export let user = [
  {
    id: 1,
    name: "abcabcd",
    picture:
      "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&rect=37%2C29%2C4955%2C3293&q=45&auto=format&w=926&fit=clip",
  },
  {
    id: 2,
    name: "pbthang",
    picture:
      "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg?resize=750px:*",
  },
  {
    id: 3,
    name: "yobrowassup",
    picture:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VAN_CAT.png/330px-VAN_CAT.png",
  },
  {
    id: 4,
    name: "imhater",
    picture:
      "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg?w=590&h=800&1966AE6B-E8E5-4D4A-AACA385519F64D03",
  },
  {
    id: 5,
    name: "lolololol",
    picture: "https://ychef.files.bbci.co.uk/1600x900/p07ryyyj.webp",
  },
];

export let chapter2 = [
  {
    id: 11,
    chapter: 2,
    numberOfBookmarks: 121,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    author: user[2],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.`,
    comments: [
      { comment: "woaw nice!", author: user[2] },
      { comment: "keep it up", author: user[0] },
      { comment: "totally hate this", author: user[3] },
    ],
  },
  {
    id: 12,
    chapter: 2,
    author: user[4],
    title: `Excepteur sint occaecat cupidatat non proident`,
    numberOfBookmarks: 37,
    content: `Sed ut perspiciatis unde omnis iste natus error sit 
      voluptatem accusantium doloremque laudantium, totam rem aperiam, 
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae 
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
      sed quia non numquam eius modi tempora incidunt ut labore et dolore 
      magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
      exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
      commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea 
      voluptate velit esse quam nihil molestiae consequatur, vel illum qui 
      dolorem eum fugiat quo voluptas nulla pariatur?`,
    comments: [
      { comment: "woaw nice!", author: user[1] },
      { comment: "keep it up", author: user[4] },
      { comment: "totally hate this", author: user[3] },
    ],
  },
];

export let books = [
  {
    id: 1,
    chapter: 1,
    title: "Lorem Ipsum",
    author: user[0],
    numberOfBookmarks: 301,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.`,
    comments: [
      { comment: "woaw nice!", author: user[2] },
      { comment: "keep it up", author: user[1] },
      { comment: "totally hate this", author: user[4] },
    ],
    nextChapter: chapter2,
  },
  {
    id: 2,
    chapter: 1,
    numberOfBookmarks: 130,
    author: user[1],
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.`,
    comments: [
      { comment: "woaw nice!", author: user[0] },
      { comment: "keep it up", author: user[0] },
      { comment: "totally hate this", author: user[3] },
    ],
    nextChapter: [],
  },
  {
    id: 3,
    chapter: 1,
    author: user[2],
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    numberOfBookmarks: 150,
    content: `Sed ut perspiciatis unde omnis iste natus error sit 
      voluptatem accusantium doloremque laudantium, totam rem aperiam, 
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae 
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
      sed quia non numquam eius modi tempora incidunt ut labore et dolore 
      magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
      exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
      commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea 
      voluptate velit esse quam nihil molestiae consequatur, vel illum qui 
      dolorem eum fugiat quo voluptas nulla pariatur?`,
    comments: [
      { comment: "woaw nice!", author: user[1] },
      { comment: "keep it up", author: user[3] },
      { comment: "totally hate this", author: user[4] },
    ],
    nextChapter: [],
  },
  {
    id: 4,
    chapter: 1,
    author: user[3],
    title: `Sed ut perspiciatis unde omnis iste natus error sit 
      voluptatem accusantium doloremque laudantium`,
    numberOfBookmarks: 332,
    content: `Sed ut perspiciatis unde omnis iste natus error sit 
      voluptatem accusantium doloremque laudantium, totam rem aperiam, 
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae 
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
      sed quia non numquam eius modi tempora incidunt ut labore et dolore 
      magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
      exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
      commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea 
      voluptate velit esse quam nihil molestiae consequatur, vel illum qui 
      dolorem eum fugiat quo voluptas nulla pariatur?`,
    comments: [
      { comment: "woaw nice!", author: user[3] },
      { comment: "keep it up", author: user[1] },
      { comment: "totally hate this", author: user[0] },
    ],
    nextChapter: [],
  },
  {
    id: 5,
    chapter: 1,
    author: user[4],
    title: `Excepteur sint occaecat cupidatat non proident`,
    numberOfBookmarks: 89,
    content: `Sed ut perspiciatis unde omnis iste natus error sit 
      voluptatem accusantium doloremque laudantium, totam rem aperiam, 
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae 
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
      sed quia non numquam eius modi tempora incidunt ut labore et dolore 
      magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
      exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
      commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea 
      voluptate velit esse quam nihil molestiae consequatur, vel illum qui 
      dolorem eum fugiat quo voluptas nulla pariatur?`,
    comments: [
      { comment: "woaw nice!", author: user[4] },
      { comment: "keep it up", author: user[0] },
      { comment: "totally hate this", author: user[4] },
    ],
    nextChapter: [],
  },
];
