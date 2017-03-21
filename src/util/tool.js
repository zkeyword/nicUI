module.exports = {
	
	/**
	 * 判断是否是数组
	 * @method nic.base.isArray
	 * @param {Object} 数组对象
	 * @return {Boolean}
	 */
	isArray: function(o){
		return o ? jQuery.isArray(o) : false;
	},
	
	/**
	 * 判断是否是对象
	 * @method nic.base.isObject
	 * @param {Object} 字符串对象
	 * @return {Boolean}
	 */
	isObject: function(o){
		return o ? Object.prototype.toString.call(o) === "[object Object]" : false;
	},
	
	/**
	 * 判断是否是函数
	 * @method nic.base.isFunction
	 * @param {Function} Function对象
	 * @return {Boolean}
	 */
	isFunction: function(o){
		return o ? Object.prototype.toString.call(o) === "[object Function]" : false;
	},
	
	/**
	 * 判断是否是空值
	 * @method nic.base.isEmpty
	 * @param {Object} 对象
	 * @return {Boolean}
	 */
	isEmpty: function(){
		if( Object.keys ){
			return Object.keys(o)
		}else{
			if( obj == null) return true;
			if( obj.length > 0) return false;
			if( obj.length === 0) return true;
			for( var key in obj ){
				if( Object.prototype.hasOwnProperty.call(obj, key) ) return false;
			}
			return true;
		}
	}
}