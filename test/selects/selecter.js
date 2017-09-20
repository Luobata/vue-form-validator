module.exports = {
    props: {
        keyString: {
            type: String,
            default: 'key'
        },
        valueString: {
            type: String,
            default: 'value'
        },
        value: {
        },
        options: {
            type: Array,
            default: []
        },
        label: {
        }
    },
    data: function () {
        return {
			cur: '',
            status: false,
            down: true,
            height: -38
        };
    },
    watch: {
        value: function () {
            this.updateCur();
        },
		item: function () {
            this.updateCur();
        },
        options: function () {
            this.updateCur();
        },
        status: function () {
            this.checkDir();
            this.updateCur();
        }
    },
    methods: {
        toggle: function () {
            this.status = !this.status;
        },
        checkDir: function () {
            var index = this.$el;
            var content = document.querySelector('body');
            var html = document.querySelector('html');
            var myTop = index.offsetTop - content.scrollTop;
            var screenHeight = html.offsetHeight;
            this.down = (screenHeight / 2 > myTop) ? true : false;
        },
        updateCur: function () {
            var that = this;
            that.cur = '';
            that.options.forEach(function (item, index) {
                if (item[that.keyString] === that.value) {
                    that.cur = item[that.valueString];
                }
            });
            if (!that.down) {
                that.height = (that.options.length > 5 ? 5 : that.options.length) * 40 + 2;
            } else {
                that.height = -38;
            }
        },
        changeCur: function (item) {
            this.$emit('input', item[this.keyString]);
            this.$emit('change', item[this.keyString]);
        }
    },
    mounted: function () {
		this.updateCur();
    }
};
