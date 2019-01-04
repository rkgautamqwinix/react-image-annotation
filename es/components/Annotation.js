var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _templateObject = _taggedTemplateLiteralLoose(['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n'], ['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: block;\n  width: 100%;\n'], ['\n  display: block;\n  width: 100%;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React, { Component } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import compose from '../utils/compose';
import isMouseHovering from '../utils/isMouseHovering';
import withRelativeMousePos from '../utils/withRelativeMousePos';

import defaultProps from './defaultProps';
import Overlay from './Overlay';

var Container = styled.div(_templateObject, Overlay);

var Img = styled.img(_templateObject2);

var Items = styled.div(_templateObject3);

var Target = Items;

export default compose(isMouseHovering(), withRelativeMousePos())((_temp = _class = function (_Component) {
  _inherits(Annotation, _Component);

  function Annotation(props) {
    _classCallCheck(this, Annotation);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      showEditor: false
    };
    return _this;
  }

  // Sort by area, largest to smallest
  // using this to get stacking order right for selecting existing
  // annotations


  // Show editor by calling renderEditor, if renderEditor returns an element it
  // will be displayed inline within Annotation


  // Handle selection of existing annotations to support update or delete
  //
  // Check if parent has enabled edit or delete
  // Make the selected annotation current and pop open the editor


  Annotation.prototype.render = function render() {
    var _this2 = this;

    var props = this.props;
    var isMouseHovering = props.isMouseHovering,
        renderHighlight = props.renderHighlight,
        renderContent = props.renderContent,
        renderSelector = props.renderSelector,
        renderOverlay = props.renderOverlay;


    var topAnnotationAtMouse = this.getTopAnnotationAt(this.props.relativeMousePos.x, this.props.relativeMousePos.y);

    return React.createElement(
      Container,
      {
        style: props.style,
        innerRef: isMouseHovering.innerRef,
        onMouseLeave: this.onTargetMouseLeave
      },
      React.createElement(Img, {
        className: props.className,
        style: props.style,
        alt: props.alt,
        src: props.src,
        draggable: false,
        innerRef: this.setInnerRef
      }),
      React.createElement(
        Items,
        {
          onClick: this.onClick,
          onMouseUp: this.onMouseUp,
          onMouseDown: this.onMouseDown,
          onMouseMove: this.onTargetMouseMove
        },
        this.getSortedAnnotations(props.annotations).map(function (annotation) {
          return renderHighlight({
            key: annotation.data.id,
            annotation: annotation,
            active: _this2.shouldAnnotationBeActive(annotation, topAnnotationAtMouse),
            selectAnnotation: _this2.selectAnnotation
          });
        }),
        !props.disableSelector && props.value && props.value.geometry && renderSelector({
          annotation: props.value
        })
      ),
      !props.disableOverlay && renderOverlay({
        type: props.type,
        annotation: props.value
      }),
      props.annotations.map(function (annotation) {
        return _this2.shouldAnnotationBeActive(annotation, topAnnotationAtMouse) && renderContent({
          key: annotation.data.id,
          annotation: annotation
        });
      }),
      !props.disableEditor && (props.value && props.value.selection && props.value.selection.showEditor ? this.onShowEditor() : this.onHideEditor()),
      React.createElement(
        'div',
        null,
        props.children
      )
    );
  };

  return Annotation;
}(Component), _class.propTypes = {
  innerRef: T.func,
  onMouseUp: T.func,
  onMouseDown: T.func,
  onMouseMove: T.func,
  onHideEditor: T.func,
  ignoreModifier: T.func,
  onClick: T.func,
  children: T.object,

  annotations: T.arrayOf(T.shape({
    type: T.string
  })).isRequired,
  type: T.string,
  selectors: T.arrayOf(T.shape({
    TYPE: T.string,
    intersects: T.func.isRequired,
    area: T.func.isRequired,
    methods: T.object.isRequired
  })).isRequired,

  value: T.shape({
    selection: T.object,
    geometry: T.shape({
      type: T.string.isRequired
    }),
    data: T.object
  }),
  onChange: T.func,
  onSubmit: T.func,
  onCreate: T.func,
  onUpdate: T.func,
  onDelete: T.func,

  activeAnnotationComparator: T.func,
  activeAnnotations: T.arrayOf(T.any),

  disableAnnotation: T.bool,
  disableSelector: T.bool,
  renderSelector: T.func,
  disableEditor: T.bool,
  renderEditor: T.func,

  renderHighlight: T.func.isRequired,
  renderContent: T.func.isRequired,

  disableOverlay: T.bool,
  renderOverlay: T.func.isRequired
}, _class.defaultProps = defaultProps, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setInnerRef = function (el) {
    _this3.container = el;
    _this3.props.relativeMousePos.innerRef(el);
    _this3.props.innerRef(el);
  };

  this.getSelectorByType = function (type) {
    return _this3.props.selectors.find(function (s) {
      return s.TYPE === type;
    });
  };

  this.getSortedAnnotations = function (annotations) {
    var container = _this3.container,
        getSelectorByType = _this3.getSelectorByType;

    var ordered = annotations.filter(function (a) {
      return !!a;
    }).sort(function (a, b) {
      var aSelector = getSelectorByType(a.geometry.type);
      var bSelector = getSelectorByType(b.geometry.type);

      return -(aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container));
    });
    return ordered;
  };

  this.getTopAnnotationAt = function (x, y) {
    var annotations = _this3.props.annotations;
    var container = _this3.container,
        getSelectorByType = _this3.getSelectorByType;


    if (!container) return;

    var intersections = annotations.map(function (annotation) {
      var geometry = annotation.geometry;

      var selector = getSelectorByType(geometry.type);

      return selector.intersects({ x: x, y: y }, geometry, container) ? annotation : false;
    }).filter(function (a) {
      return !!a;
    }).sort(function (a, b) {
      var aSelector = getSelectorByType(a.geometry.type);
      var bSelector = getSelectorByType(b.geometry.type);

      return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container);
    });

    return intersections[0];
  };

  this.onTargetMouseMove = function (e) {
    _this3.props.relativeMousePos.onMouseMove(e);
    _this3.onMouseMove(e);
  };

  this.onTargetMouseLeave = function (e) {
    _this3.props.relativeMousePos.onMouseLeave(e);
  };

  this.onMouseUp = function (e) {
    return _this3.callSelectorMethod('onMouseUp', e);
  };

  this.onMouseDown = function (e) {
    return _this3.callSelectorMethod('onMouseDown', e);
  };

  this.onMouseMove = function (e) {
    return _this3.callSelectorMethod('onMouseMove', e);
  };

  this.onClick = function (e) {
    return _this3.callSelectorMethod('onClick', e);
  };

  this.onCreate = function () {
    if ('onCreate' in _this3.props) {
      _this3.props.onCreate(_this3.props.value);
    } else {
      // deprecate onSubmit for more explicit 'onCreate' name
      _this3.props.onSubmit(_this3.props.value);
    }
  };

  this.callSelectorMethod = function (methodName, e) {
    if (_this3.props.disableAnnotation) {
      return;
    }
    if (_this3.props.ignoreModifier(e)) {
      return;
    }

    if (!!_this3.props[methodName]) {
      _this3.props[methodName](e);
    } else {
      var selector = _this3.getSelectorByType(_this3.props.type);
      if (selector && selector.methods[methodName]) {
        var value = selector.methods[methodName](_this3.props.value, e);

        if (typeof value === 'undefined') {
          if (process.env.NODE_ENV !== 'production') {
            console.error('\n              ' + methodName + ' of selector type ' + _this3.props.type + ' returned undefined.\n              Make sure to explicitly return the previous state\n            ');
          }
        } else {
          _this3.props.onChange(value);
        }
      }
    }
  };

  this.shouldAnnotationBeActive = function (annotation, top) {
    if (_this3.props.activeAnnotations) {
      var isActive = !!_this3.props.activeAnnotations.find(function (active) {
        return _this3.props.activeAnnotationComparator(annotation, active);
      });

      return isActive || top === annotation;
    } else {
      return top === annotation;
    }
  };

  this.onShowEditor = function () {
    if (!_this3.state.showEditor) {
      // prevent spamming parent with multiple show editor events
      _this3.setState({ showEditor: true });
    }
    var props = _this3.props;
    return _this3.props.renderEditor({
      annotation: props.value,
      onChange: props.onChange,
      onCreate: _this3.onCreate,
      onUpdate: props.onUpdate,
      onDelete: props.onDelete
    });
  };

  this.onHideEditor = function () {
    if (_this3.state.showEditor) {
      // prevent spamming parent with multiple hide events
      _this3.setState({ showEditor: false });
      _this3.props.onHideEditor();
    }
  };

  this.selectAnnotation = function (annotation) {
    if ('onUpdate' in _this3.props || 'onDelete' in _this3.props) {
      var update = _extends({}, annotation, { selection: _extends({}, annotation.selection, { showEditor: true, isUpdate: true }) });
      _this3.props.onChange(update);
    }
  };
}, _temp));