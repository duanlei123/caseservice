(function () {
    var module,
        __indexOf = [].indexOf || function (item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i;
                }
                return -1;
            };

    module = angular.module('angularBootstrapNavTree', []);

    module.directive('dtpAbnTree', [
        '$timeout', function ($timeout) {
            return {
                restrict: 'E',
                template: "" +
                "<ul class=\"nav nav-list nav-pills nav-stacked abn-tree\">\n " +
                "<li ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\" ng-animate=\"'abn-tree-animate'\" ng-class=\"'level-' + {{ row.level }} + (row.branch.selected ? ' active':'') + ' ' +row.classes.join(' ')\" class=\"abn-tree-row row\" >" +
                "<a ng-style=\"{'color': showColor(row.branch)}\" ng-click=\"user_clicks_branch(row.branch)\" ng-dblclick=\"update_tree_data(row.branch)\" data-toggle=\"context\" data-target=\"#caseTreeMenu\" >" +
                "<i ng-class=\"row.checkbox_icon\" ng-if='checkboxShow' class=\"indented\" ng-click=\"checkboxSet(row.branch)\"></i>" +
                "<i ng-class=\"row.tree_icon\" ng-click=\"update_tree_data(row.branch)\" class=\"indented tree-icon\"></i>" +
                "<span class=\"indented tree-label\" tooltip=\"{{row.branch.type == -1 ? row.branch.description : ''}}\">{{ row.label }}</span>" +
                "<span style=\"margin-left: 10px;\" ng-if=\"row.branch.type == -1\" class=\"indented\" tooltip=\"{{row.branch.dataNum}}组数据\">{{ '(' + row.branch.dataNum + ')' }}</span>" +
                "</a>" +
                "</li>\n</ul>",
                replace: true,
                scope: {
                    treeData: '=',
                    onSelect: '&',
                    updateTree: '&',
                    initialSelection: '@',
                    treeControl: '=',
                    selectedBranch: '=',
                    checkboxShow: '='
                },
                link: function (scope, element, attrs) {
                    var error, expand_all_parents, expand_level, for_all_ancestors, for_each_branch, get_parent, n, on_treeData_change, select_branch, selected_branch, tree;
                    error = function (s) {
                        // console.log('ERROR:' + s);
                        debugger;
                        return void 0;
                    };
                    if (attrs.iconExpand == null) {
                        attrs.iconExpand = 'fa-plus-square-o glyphicon';
                    }
                    if (attrs.iconCollapse == null) {
                        attrs.iconCollapse = 'fa-minus-square-o glyphicon';
                    }
                    if (attrs.iconLeaf == null) {
                        attrs.iconLeaf = 'fa-file-text glyphicon';
                    }
                    // 新定义的三种选择的图标
                    if (attrs.partChecked == null) {
                        attrs.partChecked = 'fa-check-square glyphicon';
                    }

                    if (attrs.wholeChecked == null) {
                        attrs.wholeChecked = 'fa-check-square-o glyphicon';
                    }

                    if (attrs.noneChecked == null) {
                        attrs.noneChecked = 'fa-square-o glyphicon';
                    }

                    if (attrs.expandLevel == null) {
                        attrs.expandLevel = '3';
                    }
                    expand_level = parseInt(attrs.expandLevel, 10);
                    if (!scope.treeData) {
                        alert('no treeData defined for the tree!');
                        return;
                    }
                    if (scope.treeData.length == null) {
                        if (treeData.label != null) {
                            scope.treeData = [treeData];
                        } else {
                            alert('treeData should be an array of root branches');
                            return;
                        }
                    }
                    for_each_branch = function (f) {
                        var do_f, root_branch, _i, _len, _ref, _results;
                        do_f = function (branch, level) {
                            var child, _i, _len, _ref, _results;
                            f(branch, level);
                            if (branch.children != null) {
                                _ref = branch.children;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    _results.push(do_f(child, level + 1));
                                }
                                return _results;
                            }
                        };
                        _ref = scope.treeData;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            root_branch = _ref[_i];
                            _results.push(do_f(root_branch, 1));
                        }
                        return _results;
                    };
                    selected_branch = null;
                    select_branch = function (branch) {
                        if (!branch) {
                            if (selected_branch != null) {
                                selected_branch.selected = false;
                            }
                            selected_branch = null;
                            return;
                        }
                        if (branch !== selected_branch) {
                            if (selected_branch != null) {
                                selected_branch.selected = false;
                            }
                            branch.selected = true;
                            selected_branch = branch;
                            expand_all_parents(branch);
                            if (branch.onSelect != null) {
                                return $timeout(function () {
                                    return branch.onSelect(branch);
                                });
                            } else {
                                if (scope.onSelect != null) {
                                    return $timeout(function () {
                                        return scope.onSelect({
                                            branch: branch
                                        });
                                    });
                                }
                            }
                        }
                    };
                    scope.user_clicks_branch = function (branch) {
                        if (branch !== selected_branch) {
                            return select_branch(branch);
                        }
                    };

                    scope.update_tree_data = function (branch) {
                        branch.expanded = !branch.expanded;
                        scope.updateTree({
                            branch: branch
                        });
                    };

                    var setParentAllotted = function (branch) {
                        var p = get_parent(branch);
                        var allottedCount = 0;
                        if (p != null) {
                            for (var i = 0; i < p.children.length; i++) {
                                if (p.children[i].allotted == true) {
                                    allottedCount++;
                                }
                            }
                            if (p.children.length == allottedCount) {
                                p.allotted = true;
                            }
                            setParentAllotted(p);
                        }
                    };

                    /**
                     * 已分配用例的颜色区分
                     * @param b
                     * @returns {*}
                     */
                    scope.showColor = function (b) {
                        if (b.allotted) {
                            return '#ADAAAA';
                        }
                        return '#656565';
                    };

                    scope.checkboxSet = function (branch) {
                        if (branch.checkbox == "whole") {
                            branch.checkbox = "none";
                        } else {
                            branch.checkbox = "whole";
                        }
                        setChildrenCheckBox(branch, branch.checkbox);
                        setParentCheckBox(branch);

                    };

                    var setChildrenCheckBox = function (branch, checkbox) {
                        if (branch.children != null) {
                            for (var i = 0; i < branch.children.length; i++) {
                                branch.children[i].checkbox = checkbox;
                                if (branch.children[i].children != null) {
                                    setChildrenCheckBox(branch.children[i], checkbox);
                                }
                            }
                        }
                    };

                    var setParentCheckBox = function (branch) {
                            var p = get_parent(branch);
                            var noneCheckedCount = 0;
                            var partCheckedCount = 0;
                            var wholeCheckedCount = 0;
                            if (p != null) {
                                for (var i = 0; i < p.children.length; i++) {
                                    if (p.children[i].checkbox == "part") {
                                        partCheckedCount++;
                                    } else if (p.children[i].checkbox == "whole") {
                                        wholeCheckedCount++;
                                    } else if (p.children[i].checkbox == "none") {
                                        noneCheckedCount++;
                                    }
                                }
                                if (p.children.length == wholeCheckedCount) {
                                    p.checkbox = "whole";
                                } else if (p.children.length == noneCheckedCount) {
                                    p.checkbox = "none";
                                } else {
                                    p.checkbox = "part";
                                }
                                // console.log(p);
                                setParentCheckBox(p);
                            }

                        }
                        ;

                    get_parent = function (child) {
                        var parent;
                        parent = void 0;
                        if (child.parent_uid) {
                            for_each_branch(function (b) {
                                if (b.uid === child.parent_uid) {
                                    return parent = b;
                                }
                            });
                        }
                        return parent;
                    };
                    for_all_ancestors = function (child, fn) {
                        var parent;
                        parent = get_parent(child);
                        if (parent != null) {
                            fn(parent);
                            return for_all_ancestors(parent, fn);
                        }
                    };
                    expand_all_parents = function (child) {
                        return for_all_ancestors(child, function (b) {
                            return b.expanded = true;
                        });
                    };
                    scope.tree_rows = [];
                    // 定义数据返回的数组
                    scope.selectedBranch = [];
                    on_treeData_change = function () {
                        var add_branch_to_list, root_branch, _i, _len, _ref, _results;
                        for_each_branch(function (b, level) {
                            if (!b.uid) {
                                return b.uid = "" + Math.random();
                            }
                        });
                        // console.log('UIDs are set.');
                        for_each_branch(function (b) {
                            var child, _i, _len, _ref, _results;
                            if (angular.isArray(b.children)) {
                                _ref = b.children;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    _results.push(child.parent_uid = b.uid);
                                }
                                return _results;
                            }
                        });
                        scope.tree_rows = [];
                        // 清空数组
                        scope.selectedBranch = [];
                        for_each_branch(function (branch) {
                            var child, f;
                            if (branch.children) {
                                if (branch.children.length > 0) {
                                    f = function (e) {
                                        if (typeof e === 'string') {
                                            return {
                                                label: e,
                                                children: []
                                            };
                                        } else {
                                            return e;
                                        }
                                    };
                                    return branch.children = (function () {
                                        var _i, _len, _ref, _results;
                                        _ref = branch.children;
                                        _results = [];
                                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                            child = _ref[_i];
                                            _results.push(f(child));
                                        }
                                        return _results;
                                    })();
                                }
                            } else {
                                return branch.children = [];
                            }
                        });
                        add_branch_to_list = function (level, branch, visible) {
                            var child, child_visible, tree_icon, checkbox_icon, _i, _len, _ref, _results;
                            if (branch.expanded == null) {
                                branch.expanded = false;
                            }
                            if (branch.classes == null) {
                                branch.classes = [];
                            }
                            // 定义新的属性用于控制checkbox图标
                            if (branch.checkbox == null) {
                                branch.checkbox = "none";
                            }
                            // 定义checkbox三种状态下的图标
                            if (branch.checkbox == "part") {
                                checkbox_icon = attrs.partChecked;
                            } else if (branch.checkbox == "whole") {
                                checkbox_icon = attrs.wholeChecked;
                            } else if (branch.checkbox == "none") {
                                checkbox_icon = attrs.noneChecked;
                            }

                            if (!branch.noLeaf && (!branch.children || branch.children.length === 0) && branch.type == -1) {
                                tree_icon = attrs.iconLeaf;
                                if (__indexOf.call(branch.classes, "leaf") < 0) {
                                    branch.classes.push("leaf");
                                }
                            } else {
                                if (branch.expanded) {
                                    tree_icon = attrs.iconCollapse;
                                } else {
                                    tree_icon = attrs.iconExpand;
                                }
                            }
                            scope.tree_rows.push({
                                level: level,
                                branch: branch,
                                label: branch.label,
                                classes: branch.classes,
                                tree_icon: tree_icon,
                                checkbox_icon: checkbox_icon,
                                visible: visible
                            });
                            // 记录所有选择的用例
                            if ((branch.checkbox != "none")) {
                                scope.selectedBranch.push({
                                    id: branch.id,
                                    label: branch.label,
                                    checkbox: branch.checkbox,
                                    type: branch.type
                                });
                            }

                            if (branch.children != null) {
                                _ref = branch.children;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    child_visible = visible && branch.expanded;
                                    _results.push(add_branch_to_list(level + 1, child, child_visible));
                                }
                                return _results;
                            }
                        };
                        _ref = scope.treeData;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            root_branch = _ref[_i];
                            _results.push(add_branch_to_list(1, root_branch, true));
                        }
                        return _results;
                    };
                    scope.$watch('treeData', on_treeData_change, true);
                    if (attrs.initialSelection != null) {
                        for_each_branch(function (b) {
                            if (b.label === attrs.initialSelection) {
                                return $timeout(function () {
                                    return select_branch(b);
                                });
                            }
                        });
                    }
                    n = scope.treeData.length;
                    // console.log('num root branches = ' + n);
                    for_each_branch(function (b, level) {
                        b.level = level;
                        return b.expanded = b.level < expand_level;
                    });
                    if (scope.treeControl != null) {
                        if (angular.isObject(scope.treeControl)) {
                            tree = scope.treeControl;
                            /**
                             * 取消所有勾选
                             */
                            tree.setBranchNoneChecked = function () {
                                return for_each_branch(function (b) {
                                    return b.checkbox = "none";
                                });
                            };
                            /**
                             *  分配责任人时候设置颜色(包含打开子节点重新读取数的时候)
                             * @param caseDutyPersonList  当前用例分配责任人 (标红)
                             * @param selectedBranch  非null  （分配责任人的时候）选择的节点( whole也要标红)
                             *                                             null  （展开子节点时，用于刷新子节点分配状态）
                             */
                            tree.setNewAllottedBranch = function (caseDutyPersonList, selectedBranch) {
                                on_treeData_change();
                                return for_each_branch(function (b) {
                                    // console.log("--call 2" + b.label + " " + b.type + " " + selectedBranch);
                                    if (b.type == -1) {
                                        for (var i = 0; i < caseDutyPersonList.length; i++) {
                                            if (caseDutyPersonList[i].case_id == b.id) {
                                                b.allotPerson = "  (" + caseDutyPersonList[i].duty_person + ")";
                                                b.allotted = true;
                                                setParentAllotted(b);
                                            }
                                        }
                                    } else if (selectedBranch != null) {
                                        for (var i = 0; i < selectedBranch.length; i++) {
                                            if (selectedBranch[i].checkbox == "whole" && selectedBranch[i].id == b.id) {
                                                b.allotted = true;
                                                setParentAllotted(b);
                                            }
                                        }
                                    } else if (b.allotted == false) { // 当 selectedBranch ==null  展开子节点需要检查是否需要allotted
                                        var p = get_parent(b);
                                        if (p != null && p.allotted == true) {
                                            b.allotted = true;
                                        }

                                    }
                                    // console.log("-------------------------")
                                });
                            };

                            // /**
                            // * 初始化已分配用例
                            // */
                            // tree.initAllottedBranch = function () {
                            //    return for_each_branch(function (b) {
                            //        if (scope.allottedBranch.indexOf(b.id) != -1 && b.type == -1) {
                            //            b.isAllotted = true;
                            //            setParentAllotted(b);
                            //        }
                            //    });
                            // };
                            //
                            // /**
                            // * 初始化已勾选用例
                            // */
                            // tree.initSelectedBranch = function () {
                            //    return for_each_branch(function (b) {
                            //        if (scope.originSelected.indexOf(b.id) != -1 && b.type == -1) {
                            //            b.checkbox = "whole";
                            //            //setChildrenCheckBox(b, b.checkbox);
                            //            setParentCheckBox(b);
                            //        }
                            //    });
                            // };
                            /** 全部选中 **/
                            tree.check_all = function () {
                                return for_each_branch(function (b) {
                                    return b.checkbox = "whole";
                                });
                            };
                            /** 全部选中 **/
                            tree.uncheck_all = function () {
                                return for_each_branch(function (b) {
                                    return b.checkbox = "none";
                                });
                            };
                            tree.expand_all = function () {
                                // on_treeData_change();
                                return for_each_branch(function (b, level) {
                                    return b.expanded = true;
                                });
                            };
                            tree.expand_module = function () {
                                return for_each_branch(function (b, level) {
                                    if (b.children.length > 0) {
                                        for (var i = 0; i < b.children.length; i++) {
                                            if (b.children[i].type != -1) {
                                                return b.expanded = true;
                                            }
                                        }
                                    }
                                    return b.expanded = false;
                                });
                            };
                            tree.collapse_all = function () {
                                return for_each_branch(function (b, level) {
                                    return b.expanded = false;
                                });
                            };
                            tree.get_first_branch = function () {
                                n = scope.treeData.length;
                                if (n > 0) {
                                    return scope.treeData[0];
                                }
                            };
                            tree.select_first_branch = function () {
                                var b;
                                b = tree.get_first_branch();
                                return tree.select_branch(b);
                            };
                            tree.get_selected_branch = function () {
                                return selected_branch;
                            };
                            tree.get_parent_branch = function (b) {
                                return get_parent(b);
                            };
                            tree.select_branch = function (b) {
                                select_branch(b);
                                return b;
                            };
                            tree.get_children = function (b) {
                                return b.children;
                            };
                            tree.select_parent_branch = function (b) {
                                var p;
                                if (b == null) {
                                    b = tree.get_selected_branch();
                                }
                                if (b != null) {
                                    p = tree.get_parent_branch(b);
                                    if (p != null) {
                                        tree.select_branch(p);
                                        return p;
                                    }
                                }
                            };
                            tree.add_branch = function (parent, new_branch) {
                                if (parent != null) {
                                    parent.children.push(new_branch);
                                    parent.expanded = true;
                                } else {
                                    scope.treeData.push(new_branch);
                                }
                                return new_branch;
                            };

                            tree.del_children_branch = function (parent) {
                                if (parent != null) {
                                    if (parent.children != null) {
                                        tree.del_children_branch(parent.children);
                                        // console.log(parent.length);
                                    }
                                    else {
                                        parent.length = 0;
                                    }
                                }
                            };

                            tree.del_curr_branch = function (cuur, b) {
                                if (cuur != null) {
                                    var target;
                                    var p = tree.get_parent_branch(cuur);
                                    if (p != null) {
                                        target = p.children;
                                    } else {
                                        target = scope.treeData;
                                    }
                                    for (var i = 0; i < target.length; i++) {
                                        if (target[i].label == b) {
                                            target.splice(i, 1);
                                            break;
                                        }
                                    }
                                }
                            }

                            tree.add_root_branch = function (new_branch) {
                                tree.add_branch(null, new_branch);
                                return new_branch;
                            };
                            tree.expand_branch = function (b) {
                                if (b == null) {
                                    b = tree.get_selected_branch();
                                }
                                if (b != null) {
                                    b.expanded = true;
                                    return b;
                                }
                            };
                            tree.collapse_branch = function (b) {
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    b.expanded = false;
                                    return b;
                                }
                            };
                            tree.get_siblings = function (b) {
                                var p, siblings;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    p = tree.get_parent_branch(b);
                                    if (p) {
                                        siblings = p.children;
                                    } else {
                                        siblings = scope.treeData;
                                    }
                                    return siblings;
                                }
                            };
                            tree.get_next_sibling = function (b) {
                                var i, siblings;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    siblings = tree.get_siblings(b);
                                    n = siblings.length;
                                    i = siblings.indexOf(b);
                                    if (i < n) {
                                        return siblings[i + 1];
                                    }
                                }
                            };
                            tree.get_branch_index = function (b) {
                                var i, siblings;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                siblings = tree.get_siblings(b);
                                n = siblings.length;
                                i = siblings.indexOf(b);
                                return i;
                            };

                            tree.get_prev_sibling = function (b) {
                                var i, siblings;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                siblings = tree.get_siblings(b);
                                n = siblings.length;
                                i = siblings.indexOf(b);
                                if (i > 0) {
                                    return siblings[i - 1];
                                }
                            };

                            tree.select_next_sibling = function (b) {
                                var next;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    next = tree.get_next_sibling(b);
                                    if (next != null) {
                                        return tree.select_branch(next);
                                    }
                                }
                            };
                            tree.select_prev_sibling = function (b) {
                                var prev;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    prev = tree.get_prev_sibling(b);
                                    if (prev != null) {
                                        return tree.select_branch(prev);
                                    }
                                }
                            };
                            tree.get_first_child = function (b) {
                                var _ref;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    if (((_ref = b.children) != null ? _ref.length : void 0) > 0) {
                                        return b.children[0];
                                    }
                                }
                            };
                            tree.get_closest_ancestor_next_sibling = function (b) {
                                var next, parent;
                                next = tree.get_next_sibling(b);
                                if (next != null) {
                                    return next;
                                } else {
                                    parent = tree.get_parent_branch(b);
                                    return tree.get_closest_ancestor_next_sibling(parent);
                                }
                            };
                            tree.get_next_branch = function (b) {
                                var next;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    next = tree.get_first_child(b);
                                    if (next != null) {
                                        return next;
                                    } else {
                                        next = tree.get_closest_ancestor_next_sibling(b);
                                        return next;
                                    }
                                }
                            };
                            tree.select_next_branch = function (b) {
                                var next;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    next = tree.get_next_branch(b);
                                    if (next != null) {
                                        tree.select_branch(next);
                                        return next;
                                    }
                                }
                            };
                            tree.last_descendant = function (b) {
                                var last_child;
                                if (b == null) {
                                    debugger;
                                }
                                n = b.children.length;
                                if (n === 0) {
                                    return b;
                                } else {
                                    last_child = b.children[n - 1];
                                    return tree.last_descendant(last_child);
                                }
                            };
                            tree.get_prev_branch = function (b) {
                                var parent, prev_sibling;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    prev_sibling = tree.get_prev_sibling(b);
                                    if (prev_sibling != null) {
                                        return tree.last_descendant(prev_sibling);
                                    } else {
                                        parent = tree.get_parent_branch(b);
                                        return parent;
                                    }
                                }
                            };
                            return tree.select_prev_branch = function (b) {
                                var prev;
                                if (b == null) {
                                    b = selected_branch;
                                }
                                if (b != null) {
                                    prev = tree.get_prev_branch(b);
                                    if (prev != null) {
                                        tree.select_branch(prev);
                                        return prev;
                                    }
                                }
                            };
                        }
                    }
                }
            };
        }
    ]);

}).call(this);