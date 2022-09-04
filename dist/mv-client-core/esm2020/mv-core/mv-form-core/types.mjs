/**
 * transposed column name is PRE + key to ensure that it does not clash with any existing attribute
 */
const PRE = 'c_';
/**
 * utility that handles row-to-column for rendering,
 * and possibly col back to row to send teh data back to the server
 */
export class Transposer {
    /**
     * convert child-rows of each row of data inito its aown attributes as columns
     * @param rowToColMeta meta data as to what and how to convert data from row into column
     * @param tableMeta this is for our bt-table to get column headings and names
     * @param data actual data to be transposed.
     * Each row in this array will have additional members that will be used by bt-table.
     * these values can be later pushed back to the child-rows
     */
    static rowToCol(rowToColMeta, tableMeta, data) {
        /**
         * extract meta data for transposition
         */
        rowToColMeta.columns.forEach((row) => {
            const key = row[rowToColMeta.keyAttribute];
            if (!key) {
                console.error('Key not found in a names element with attr ' + rowToColMeta.keyAttribute + '. Element is ', row);
            }
            else {
                let heading = row[rowToColMeta.headingAttribute];
                if (rowToColMeta.subHeadingAttribute) {
                    heading = heading + '-' + row[rowToColMeta.subHeadingAttribute];
                }
                const colName = PRE + key;
                tableMeta.names.push(colName);
                tableMeta.headings[colName] = heading;
            }
        });
        /**
         * got meta-data. now go to each row and add columns to it based on its child-rows
         */
        const rowAtt = rowToColMeta.datarowsAttribute;
        const keyAtt = rowToColMeta.rowKeyAttribute;
        const valAtt = rowToColMeta.rowValueAttribute;
        const meta = {
            datarowsAttribute: rowAtt,
            rowKeyAttribute: keyAtt,
            rowValueAttribute: valAtt
        };
        if (!data || !data.length) {
            console.log('Input data is empty or has no rows');
            return meta;
        }
        /**
         * for each data row
         */
        data.forEach((row) => {
            if (!row) {
                console.log('Row is empty');
            }
            else {
                /**
                 * for each row meant to be transposed as a column
                 */
                const children = row[rowAtt];
                if (!children) {
                    console.log('Row does not have array value for tag/attr ' + rowAtt);
                }
                else {
                    children.forEach(child => {
                        if (child) {
                            const colName = PRE + child[keyAtt];
                            row[colName] = child[valAtt];
                        }
                        else {
                            console.warn('empty child element found. ignored');
                        }
                    });
                }
            }
        });
        return meta;
    }
    /**
     * convert column values back to rows in the data rows
     * @param colToRowMeta meta data that was returned from rowToCol() nethod
     * @param data data that was passed to rowToCol() method
     */
    static colToRow(colToRowMeta, data) {
        const rowAtt = colToRowMeta.datarowsAttribute;
        const keyAtt = colToRowMeta.rowKeyAttribute;
        const valAtt = colToRowMeta.rowValueAttribute;
        if (!data || !data.length) {
            console.warn('No data to re-transpose');
            return;
        }
        /**
         * for each data row
         */
        data.forEach((row) => {
            if (!row) {
                console.log('Data has an empty row');
            }
            else {
                const children = row[rowAtt];
                if (!children || !children.length) {
                    console.warn('Row has no or empty children with tag/attr ' + rowAtt);
                }
                else {
                    /**
                     * for each row meant to be transposed as a column
                     */
                    children.forEach((child) => {
                        const key = child[keyAtt];
                        child[valAtt] = row[PRE + key];
                    });
                }
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tdi1jbGllbnQtY29yZS9zcmMvbXYtY29yZS9tdi1mb3JtLWNvcmUvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUlBOztHQUVHO0FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2pCOzs7R0FHRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBQ3RCOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQTBCLEVBQ3pDLFNBQTZDLEVBQzdDLElBQWM7UUFDZDs7V0FFRztRQUNILFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDekMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQyxJQUFHLENBQUMsR0FBRyxFQUFDO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEdBQUcsWUFBWSxDQUFDLFlBQVksR0FBRyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDaEg7aUJBQUk7Z0JBQ0osSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNqRCxJQUFHLFlBQVksQ0FBQyxtQkFBbUIsRUFBQztvQkFDbkMsT0FBTyxHQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNqRTtnQkFDRCxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUMxQixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVIOztXQUVH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bnQiOlsiZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlIHtcclxuXHQvKipcclxuXHQgKiBvbmUgb2YgdGhlIHByZS1kZWZpbmVkIHR5cGUgTWVzc2FnZS5cclxuXHQgKi9cclxuXHR0eXBlOiBcImVycm9yXCIgfCBcIndhcm5pbmdcIiB8IFwiaW5mb1wiIHwgXCJzdWNjZXNzXCI7XHJcblx0LyoqXHJcblx0ICogdW5pcXVlIG5hbWUgYXNzaWduZWQgdG8gdGhpcyBtZXNzYWdlIGluIHRoZSBhcHBcclxuXHQgKi9cclxuXHRpZDogc3RyaW5nO1xyXG5cdC8qKlxyXG5cdCAqIGZvcm1hdHRlZCB0ZXh0IGluIEVuZ2xpc2ggdGhhdCBpcyByZWF5IHRvIGJlIHJlbmRlcmVkXHJcblx0ICovXHJcblx0dGV4dDogc3RyaW5nO1xyXG5cdC8qKlxyXG5cdCAqIG5hbWUgb2YgdGhlIGZpZWxkIChwcmltYXJ5IG9uZSBpbiBjYXNlIG1vcmUgdGhhbiBvbmUgZmllbGQgYXJlIGludm9sdmVkKSB0aGF0IGlzIHRoZVxyXG5cdCAqIGNhdXNlIG9mIHRoaXMgZXJyb3IuIG51bGwgaWYgdGhpcyBpcyBub3Qgc3BlY2lmaWMgdG8gYW55IGZpZWxkLlxyXG5cdCAqL1xyXG5cdGZpZWxkTmFtZT86IHN0cmluZztcclxuXHQvKipcclxuXHQgKiBuYW1lIG9mIHRoZSB0YWJsZS9vYmplY3QgdGhhdCB0aGUgZmllbGQgaXMgcGFydCBvZi4gbnVsbCBpZiB0aGlzIG5vdCByZWxldmFudFxyXG5cdCAqL1xyXG5cdG9iamVjdE5hbWU/OiBzdHJpbmc7XHJcblx0LyoqXHJcblx0ICogMC1iYXNlZCByb3cgbnVtYmVyIGluIGNhc2UgdGhlIGZpZWxkIGluIGVycm9yIGlzIHBhcnQgb2YgYSB0YWJsZS5cclxuXHQgKi9cclxuXHRpZHg/OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIHJ1bi10aW1lIHBhcmFtZXRlcnMgdGhhdCBhcmUgdXNlZCB0byBjb21wb3NlIHRoaXMgbWVzc2FnZS4gVGhpcyBpcyB1c2VmdWwgaW4gaTE4blxyXG5cdCAqL1xyXG5cdHBhcmFtcz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vKipcclxuICogVmFsdWUgb2JqZWN0IHJlcHJlc2VudHMgYSBnZW5lcmFsIEpTT04gb2JqZWN0IHRoYXQgd2UgbWF5IFxyXG4gKiB1c2UgdG8gcGFzcyBkYXRhIGJhY2stYW5kLWZvcnRoIGJldHdlZW4gdGhlIGNsaWVudCBhbnMgdGhlIHNlcnZlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBWbyB7XHJcblx0W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCBWbyB8IFZvW10gfCBTZWxlY3RPcHRpb25bXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHNlcnZlciByZXNwb25kcyB3aXRoIGEganNvbiB3aXRoIHNwZWNpZmljIHN0cnVjdHVyZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBTZXJ2ZXJSZXNwb25zZSB7XHJcblx0YWxsT2s/OiBib29sZWFuO1xyXG5cdG1lc3NhZ2VzPzogQXJyYXk8TWVzc2FnZT47XHJcblx0ZGF0YT86IFZvO1xyXG5cdHRva2VuPzpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRWYWx1ZXMge1xyXG5cdFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdE9wdGlvbiB7XHJcblx0dmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuXHR0ZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9uIHtcclxuXHRjb21wOiBcIj1cIiB8IFwiIT1cIiB8IFwiPFwiIHwgXCI8PVwiIHwgXCI+XCIgfCBcIj49XCIgfCBcIj48XCIgfCBcIl5cIiB8IFwiflwiO1xyXG5cdHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xyXG5cdHRvVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyUmVxdWVzdCB7XHJcblx0Y29uZGl0aW9uczogeyBba2V5OiBzdHJpbmddOiBDb25kaXRpb24gfTtcclxuXHRzb3J0PzogeyBba2V5OiBzdHJpbmddOiBcImFzY1wiIHwgXCJkZXNjXCIgfCBcIlwiIH07XHJcblx0bWF4Um93cz86IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIHV0aWxpdHkgdG8gbWFuYWdlIHJvLXRvLWNvbHVtbiBhbmQgY29sdW1uLXRvLXJvd3MgYXMgcGVyIG91ciBjb252ZW50aW50aW9uc1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSb3dUb0NvbE1ldGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBjb2x1bW5zIGlzIGFuIGFycmF5IG9mIG9iamVjdHMuIGVhY2ggZWxlbWVudCBoYXMgbWV0YSBkYXRhIGZvciBhIGNvbHVtbi5cclxuICAgICAqIGxlbmd0aCBvZiB0aGlzIGFycmF5IGlzIHRlaCBudW1iZXIgb2YgY29sdW1ucyB0byBiZSB1c2VkLlxyXG4gICAgICogV2UgbmVlZCB0byBrbm93IHRoZSBrZXlBdHRyaWJ1dGUgdGhhdCByZXByZXNlbnRzIHRoIGV2YWx1ZSwgYW5kIHRoZSBoZWFkaW5nIHRvIGJlIGlzZWQgZm9yIHRoYXQgY29sdW1uXHJcbiAgICAgKiBlLmcuW3tcImlkXCI6MSwgXCJuYW1lXCI6XCJDb2wxXCJ9LCB7XCJpZFwiOjIsIFwibmFtZVwiOlwiY29sMlwifV1cclxuICAgICAqL1xyXG5cdGNvbHVtbnM6IG9iamVjdFtdLFxyXG4gICAgLyoqXHJcbiAgICAgKiBhdHRyaWJ1dGUgbmFtZSBpbiB0aGUgY2x1bW4tYXJyYXkgdGhhdCBpcyB0byBiZSB1c2VkIGFzIGtleS9pZCBmb3IgdGhlIGNvbHVtblxyXG4gICAgICovXHJcblx0a2V5QXR0cmlidXRlOiBzdHJpbmcsXHJcbiAgICAvKipcclxuICAgICAqIGF0dHJpYnV0ZSBuYW1lIGluIHRoZSBjbHVtbi1hcnJheSB0aGF0IGlzIHRvIGJlIHVzZWQgYXMgY29sdW1uIGhlYWRpbmdcclxuICAgICAqL1xyXG5cdGhlYWRpbmdBdHRyaWJ1dGU6IHN0cmluZyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGlmIHRoZSBoZWFkaW5nICBoYXMgdHdvIGZpZWxkcywgdGhlIHNlY29uZCBvbmUgY2FuIGJlIHVzZWQgYXMgc3ViLWhlYWRpbmdcclxuICAgICAqL1xyXG5cdHN1YkhlYWRpbmdBdHRyaWJ1dGU/OiBzdHJpbmcsXHJcbiAgICAvKipcclxuICAgICAqIGVhY2ggcm93IGluIHRoZSBkYXRhIGhhcyBhIGNoaWxkLWFycmF5IHRoYXQgaGFzIHJvd3MgdG8gYmUgdGFyYW5zcG9zZWQuXHJcbiAgICAgKiBwcm92aWRlIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdGhhdCBoYXMgdGhpcyBjaGlsZC1hcnJheVxyXG4gICAgICovXHJcblx0ZGF0YXJvd3NBdHRyaWJ1dGU6IHN0cmluZyxcclxuICAgIC8qKlxyXG4gICAgICogZWFjaCByb3cgaW4gdGhlIGNoaWxkLWFycmF5IGhhcyBhIG1lbWJlciB0aGF0IGhhcyB0aGUga2V5IGJhc2VkIG9uIHdoaWNoIFxyXG5cdCAqIHdlIGRlY2lkZSB3aGljaCBjb2x1bW4gc2hvdWxkIGl0IGJlIHRyYW5zcG9zZWQgdG8uXHJcbiAgICAgKiBwcm92aWRlIHRoZSBuYW1lIG9mIHRoaXMgYXR0cmlidXRlLiBcclxuICAgICAqL1xyXG5cdHJvd0tleUF0dHJpYnV0ZTogc3RyaW5nLFxyXG4gICAgLyoqXHJcbiAgICAgKiBhdHRyaWJ1dGUgdGhhdCBoYXMgdGhlIGFjdHVhbCB2YWx1ZSB0byBiZSBzZXQgdG8gdGhlIGNvbHVtblxyXG4gICAgICovXHJcblx0cm93VmFsdWVBdHRyaWJ1dGU6IHN0cmluZ1xyXG59XHJcblxyXG4vKipcclxuICogbWV0YSBkYXRhIHJlcXVpcmVkIHRvIHB1c2ggZGF0YSBuYWNrIGZyb20gY29sdW1uIHRvIHJvd3MuXHJcbiAqIHRoaXMgaXMgbWVhbmlpbmdmdWwgb25seSBvZiB0aGUgY29scyB3ZXJlIGNyZWF0ZWQgZnJvbSByb3dzIGVhcmxpZXIuIFxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb2xUb1Jvd01ldGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBlYWNoIHJvdyBpbiB0aGUgZGF0YSBoYXMgYSBjaGlsZC1hcnJheSB0aGF0IGhhcyByb3dzIHRvIGJlIHRhcmFuc3Bvc2VkLlxyXG4gICAgICogcHJvdmlkZSB0aGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRoYXQgaGFzIHRoaXMgY2hpbGQtYXJyYXlcclxuICAgICAqL1xyXG5cdGRhdGFyb3dzQXR0cmlidXRlOiBzdHJpbmcsXHJcbiAgICAvKipcclxuICAgICAqIGVhY2ggcm93IGluIHRoZSBjaGlsZC1hcnJheSBoYXMgYSBtZW1iZXIgdGhhdCBoYXMgdGhlIGtleSBiYXNlZCBvbiB3aGljaCBcclxuXHQgKiB3ZSBkZWNpZGUgd2hpY2ggY29sdW1uIHNob3VsZCBpdCBiZSB0cmFuc3Bvc2VkIHRvLlxyXG4gICAgICogcHJvdmlkZSB0aGUgbmFtZSBvZiB0aGlzIGF0dHJpYnV0ZS4gXHJcbiAgICAgKi9cclxuXHRyb3dLZXlBdHRyaWJ1dGU6IHN0cmluZyxcclxuICAgIC8qKlxyXG4gICAgICogYXR0cmlidXRlIHRoYXQgaGFzIHRoZSBhY3R1YWwgdmFsdWUgdG8gYmUgc2V0IHRvIHRoZSBjb2x1bW5cclxuICAgICAqL1xyXG5cdHJvd1ZhbHVlQXR0cmlidXRlOiBzdHJpbmdcclxuXHJcbn1cclxuLyoqXHJcbiAqIHRyYW5zcG9zZWQgY29sdW1uIG5hbWUgaXMgUFJFICsga2V5IHRvIGVuc3VyZSB0aGF0IGl0IGRvZXMgbm90IGNsYXNoIHdpdGggYW55IGV4aXN0aW5nIGF0dHJpYnV0ZSBcclxuICovXHJcbmNvbnN0IFBSRSA9ICdjXyc7XHJcbi8qKlxyXG4gKiB1dGlsaXR5IHRoYXQgaGFuZGxlcyByb3ctdG8tY29sdW1uIGZvciByZW5kZXJpbmcsIFxyXG4gKiBhbmQgcG9zc2libHkgY29sIGJhY2sgdG8gcm93IHRvIHNlbmQgdGVoIGRhdGEgYmFjayB0byB0aGUgc2VydmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNwb3NlciB7XHJcblx0LyoqXHJcblx0ICogY29udmVydCBjaGlsZC1yb3dzIG9mIGVhY2ggcm93IG9mIGRhdGEgaW5pdG8gaXRzIGFvd24gYXR0cmlidXRlcyBhcyBjb2x1bW5zXHJcblx0ICogQHBhcmFtIHJvd1RvQ29sTWV0YSBtZXRhIGRhdGEgYXMgdG8gd2hhdCBhbmQgaG93IHRvIGNvbnZlcnQgZGF0YSBmcm9tIHJvdyBpbnRvIGNvbHVtblxyXG5cdCAqIEBwYXJhbSB0YWJsZU1ldGEgdGhpcyBpcyBmb3Igb3VyIGJ0LXRhYmxlIHRvIGdldCBjb2x1bW4gaGVhZGluZ3MgYW5kIG5hbWVzXHJcblx0ICogQHBhcmFtIGRhdGEgYWN0dWFsIGRhdGEgdG8gYmUgdHJhbnNwb3NlZC4gXHJcblx0ICogRWFjaCByb3cgaW4gdGhpcyBhcnJheSB3aWxsIGhhdmUgYWRkaXRpb25hbCBtZW1iZXJzIHRoYXQgd2lsbCBiZSB1c2VkIGJ5IGJ0LXRhYmxlLlxyXG5cdCAqIHRoZXNlIHZhbHVlcyBjYW4gYmUgbGF0ZXIgcHVzaGVkIGJhY2sgdG8gdGhlIGNoaWxkLXJvd3NcclxuXHQgKi9cclxuXHRzdGF0aWMgcm93VG9Db2wocm93VG9Db2xNZXRhOiBSb3dUb0NvbE1ldGEsXHJcblx0XHR0YWJsZU1ldGE6IHsgbmFtZXM6IHN0cmluZ1tdLCBoZWFkaW5nczogYW55IH0sXHJcblx0XHRkYXRhOiBvYmplY3RbXSk6IENvbFRvUm93TWV0YSB7XHJcblx0XHQvKipcclxuXHRcdCAqIGV4dHJhY3QgbWV0YSBkYXRhIGZvciB0cmFuc3Bvc2l0aW9uXHJcblx0XHQgKi9cclxuXHRcdHJvd1RvQ29sTWV0YS5jb2x1bW5zLmZvckVhY2goKHJvdzogYW55KSA9PiB7XHJcblx0XHRcdGNvbnN0IGtleSA9IHJvd1tyb3dUb0NvbE1ldGEua2V5QXR0cmlidXRlXTtcclxuXHRcdFx0aWYoIWtleSl7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignS2V5IG5vdCBmb3VuZCBpbiBhIG5hbWVzIGVsZW1lbnQgd2l0aCBhdHRyICcgKyByb3dUb0NvbE1ldGEua2V5QXR0cmlidXRlICsgJy4gRWxlbWVudCBpcyAnLCByb3cpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgaGVhZGluZyA9IHJvd1tyb3dUb0NvbE1ldGEuaGVhZGluZ0F0dHJpYnV0ZV07XHJcblx0XHRcdFx0aWYocm93VG9Db2xNZXRhLnN1YkhlYWRpbmdBdHRyaWJ1dGUpe1xyXG5cdFx0XHRcdFx0aGVhZGluZyAgPSBoZWFkaW5nICsgJy0nICsgcm93W3Jvd1RvQ29sTWV0YS5zdWJIZWFkaW5nQXR0cmlidXRlXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y29uc3QgY29sTmFtZSA9IFBSRSArIGtleTtcclxuXHRcdFx0XHR0YWJsZU1ldGEubmFtZXMucHVzaChjb2xOYW1lKTtcclxuXHRcdFx0XHR0YWJsZU1ldGEuaGVhZGluZ3NbY29sTmFtZV0gPSBoZWFkaW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogZ290IG1ldGEtZGF0YS4gbm93IGdvIHRvIGVhY2ggcm93IGFuZCBhZGQgY29sdW1ucyB0byBpdCBiYXNlZCBvbiBpdHMgY2hpbGQtcm93c1xyXG5cdFx0ICovXHJcblx0XHRjb25zdCByb3dBdHQgPSByb3dUb0NvbE1ldGEuZGF0YXJvd3NBdHRyaWJ1dGU7XHJcblx0XHRjb25zdCBrZXlBdHQgPSByb3dUb0NvbE1ldGEucm93S2V5QXR0cmlidXRlO1xyXG5cdFx0Y29uc3QgdmFsQXR0ID0gcm93VG9Db2xNZXRhLnJvd1ZhbHVlQXR0cmlidXRlO1xyXG5cdFx0Y29uc3QgbWV0YSA9IHtcclxuXHRcdFx0ZGF0YXJvd3NBdHRyaWJ1dGU6IHJvd0F0dCxcclxuXHRcdFx0cm93S2V5QXR0cmlidXRlOiBrZXlBdHQsXHJcblx0XHRcdHJvd1ZhbHVlQXR0cmlidXRlOiB2YWxBdHRcclxuXHRcdH07XHJcblx0XHRpZiAoIWRhdGEgfHwgIWRhdGEubGVuZ3RoKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdJbnB1dCBkYXRhIGlzIGVtcHR5IG9yIGhhcyBubyByb3dzJyk7XHJcblx0XHRcdHJldHVybiBtZXRhO1xyXG5cdFx0fVxyXG5cdFx0LyoqXHJcblx0XHQgKiBmb3IgZWFjaCBkYXRhIHJvd1xyXG5cdFx0ICovXHJcblx0XHRkYXRhLmZvckVhY2goKHJvdzphbnkpID0+IHtcclxuXHRcdFx0aWYgKCFyb3cpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnUm93IGlzIGVtcHR5Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0LyoqXHJcblx0XHRcdFx0ICogZm9yIGVhY2ggcm93IG1lYW50IHRvIGJlIHRyYW5zcG9zZWQgYXMgYSBjb2x1bW5cclxuXHRcdFx0XHQgKi9cclxuXHRcdFx0XHRjb25zdCBjaGlsZHJlbiA9IHJvd1tyb3dBdHRdIGFzIFtdO1xyXG5cdFx0XHRcdGlmICghY2hpbGRyZW4pIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdSb3cgZG9lcyBub3QgaGF2ZSBhcnJheSB2YWx1ZSBmb3IgdGFnL2F0dHIgJyArIHJvd0F0dCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBjb2xOYW1lID0gUFJFICsgY2hpbGRba2V5QXR0XTtcclxuXHRcdFx0XHRcdFx0XHRyb3dbY29sTmFtZV0gPSBjaGlsZFt2YWxBdHRdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybignZW1wdHkgY2hpbGQgZWxlbWVudCBmb3VuZC4gaWdub3JlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG1ldGE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBjb252ZXJ0IGNvbHVtbiB2YWx1ZXMgYmFjayB0byByb3dzIGluIHRoZSBkYXRhIHJvd3NcclxuXHQgKiBAcGFyYW0gY29sVG9Sb3dNZXRhIG1ldGEgZGF0YSB0aGF0IHdhcyByZXR1cm5lZCBmcm9tIHJvd1RvQ29sKCkgbmV0aG9kXHJcblx0ICogQHBhcmFtIGRhdGEgZGF0YSB0aGF0IHdhcyBwYXNzZWQgdG8gcm93VG9Db2woKSBtZXRob2RcclxuXHQgKi9cclxuXHRzdGF0aWMgY29sVG9Sb3coY29sVG9Sb3dNZXRhOiBDb2xUb1Jvd01ldGEsIGRhdGE6IG9iamVjdFtdKTogdm9pZCB7XHJcblx0XHRjb25zdCByb3dBdHQgPSBjb2xUb1Jvd01ldGEuZGF0YXJvd3NBdHRyaWJ1dGU7XHJcblx0XHRjb25zdCBrZXlBdHQgPSBjb2xUb1Jvd01ldGEucm93S2V5QXR0cmlidXRlO1xyXG5cdFx0Y29uc3QgdmFsQXR0ID0gY29sVG9Sb3dNZXRhLnJvd1ZhbHVlQXR0cmlidXRlO1xyXG5cdFx0aWYgKCFkYXRhIHx8ICFkYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ05vIGRhdGEgdG8gcmUtdHJhbnNwb3NlJyk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0ICogZm9yIGVhY2ggZGF0YSByb3dcclxuXHRcdCAqL1xyXG5cdFx0ZGF0YS5mb3JFYWNoKChyb3c6YW55KSA9PiB7XHJcblx0XHRcdGlmICghcm93KSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0RhdGEgaGFzIGFuIGVtcHR5IHJvdycpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gcm93W3Jvd0F0dF07XHJcblx0XHRcdFx0aWYgKCFjaGlsZHJlbiB8fCAhY2hpbGRyZW4ubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1JvdyBoYXMgbm8gb3IgZW1wdHkgY2hpbGRyZW4gd2l0aCB0YWcvYXR0ciAnICsgcm93QXR0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBmb3IgZWFjaCByb3cgbWVhbnQgdG8gYmUgdHJhbnNwb3NlZCBhcyBhIGNvbHVtblxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRjaGlsZHJlbi5mb3JFYWNoKChjaGlsZDphbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0Y29uc3Qga2V5ID0gY2hpbGRba2V5QXR0XTtcclxuXHRcdFx0XHRcdFx0Y2hpbGRbdmFsQXR0XSA9IHJvd1tQUkUgKyBrZXldO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn0iXX0=