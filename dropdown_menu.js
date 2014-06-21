var MENU = [
  {
    'title': 'Item 1',
    'submenu': null,
  },
  {
    'title': 'Item 2',
    'submenu': null,
  },
  {
    'title': 'Item 3',
    'submenu': [
      {
        'title': 'Sub 1',
        'submenu': null,
      },
      {
        'title': 'Sub 2',
        'submenu': null,
      },
      {
        'title': 'Sub 3',
        'submenu': [
          {
            'title': 'SubSub 1',
            'submenu': null,
          },
          {
            'title': 'SubSub 2',
            'submenu': null,
          },
          {
            'title': 'SubSub 3',
            'submenu': null,
          },
        ]
      }
    ]
  }
];

// Returns CSS class for submenu with the given level.
function levelClass(level) {
  switch(level) {
    case 0: return 'pink';
    case 1: return 'violet';
    case 2: return 'green';
  }
  return '';
}

// Alert menu item contents (title) when given menu item (elem) is clicked on.
function addClickHandler(elem, title) {
  elem.addEventListener('click', function(e) {
    alert(title);
    e.stopPropagation();
  });
}

// Open sub-menu (menu) when given menu item (parent) is hovered on.
function addHoverHandler(parent, menu) {
  parent.addEventListener('mouseover', function(e) {
    menu.classList.add('open');
    e.stopPropagation();
  });
}

// Creates the DOM for the entire menu and submenus based on the given
// JSON config (jsonArray), and attaches it to the given DOM node (rootElem).
// The current layer of the menu (level) is also passed in.
function buildItems(jsonArray, rootElem, level) {
  var subMenu = document.createElement('div');
  subMenu.classList.add('menu');
  if (level == 0) subMenu.classList.add('open');
  rootElem.appendChild(subMenu);

  for (var i = 0; i < jsonArray.length; i++) {
    var jsonItem = jsonArray[i];

    // Create menu item and add CSS classes.
    var elem = document.createElement('div');
    elem.classList.add('menu-item');
    elem.classList.add(levelClass(level));
    if (level > 0) elem.classList.add('child');

    var span = document.createElement('span');
    span.appendChild(document.createTextNode(jsonItem['title']));
    elem.appendChild(span);

    // Add event listeners.
    addClickHandler(elem, jsonItem['title']);
    addHoverHandler(rootElem, subMenu);

    // Build submenus.
    subMenu.appendChild(elem);
    if (jsonItem['submenu']) {
      buildItems(jsonItem['submenu'], elem, level + 1);
    }
  }
}

var menu = document.getElementById('menu');
buildItems(MENU, menu, 0);




